import createRedisClient from '@core/utils/create_redis_client'
import socket from '@core/services/routes/emitter'
import Logger from '@core/services/logger'
import Team from '@apps/maha/models/team'
import * as knex from '@core/vendor/knex'
import moment from 'moment'
import Bull from 'bull'

class Queue {

  constructor(opts) {
    const options = {
      ...opts,
      attempts: 3,
      enqueue: async (req, job) => job,
      failed: async (job, err) => {}
    }
    this._enqueue = options.enqueue
    this.attempts = options.attempts
    this.name = options.name
    this.processor = options.processor
    this.refresh = options.refresh
    this.failed = options.failed
    this.completed = options.completed
    this.queue = new Bull(this.name, {
      createClient: createRedisClient
    })
  }

  start(options) {
    this.queue.process(wrapped(this.name, this.processor, this.refresh))
    if(this.failed) this.queue.on('failed', this.fail(this.failed))
    if(this.completed) this.queue.on('completed', this.completed)
    return this.queue
  }

  async enqueue(req, data, options = {}) {
    const job = await this._enqueue(req, data)
    if(process.env.NODE_ENV === 'test') return
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 500)
    })
    return await this.queue.add({
      ...job  || {},
      team_id: req.team ? req.team.get('id') : null
    }, {
      removeOnComplete: true,
      delay: options.until ? options.until.diff(moment()) : 2000,
      attempts: this.attempts,
      backoff: 5000
    })
  }

  fail(method) {
    return async(job, err) => {
      if(process.env !== 'production') console.error(err)
      await method(job, err)
    }
  }

  async clean(type) {
    return await this.queue.clean(0, type)
  }

  async getJob(job_id) {
    return await this.queue.getJob(job_id)
  }

}

const wrapped = (title, processor, refresh) => {
  const processorWithLogger = withLogger(title, processor)
  const processorWithTransaction = withTransaction(processorWithLogger, refresh)
  return async (job, done) => {
    try {
      await processorWithTransaction(job)
      done()
    } catch(err) {
      done(err)
    }
  }
}

const withLogger = (title, processor) => async (req, job) => {
  const logger = new Logger('worker')
  logger.begin(req)
  const data = {
    id: job.id,
    job: job.data
  }
  try {
    await processor(req, job)
    logger.info(req, title, data)
  } catch(err) {
    logger.error(req, title, data, err)
    throw(err)
  }
}

const withTransaction = (processor, refresh) => async (job) => {
  knex.maha.transaction(async maha => {
    knex.analytics.transaction(async analytics => {
      const req = {
        analytics,
        trx: maha,
        maha
      }
      try {
        req.team = job.data.team_id ? await Team.query(qb => {
          qb.where('id', job.data.team_id)
        }).fetch({
          withRelated: ['logo'],
          transacting: req.trx
        }) : null
        const result = await processor(req, job)
        if(refresh) {
          const channels = await refresh(req, job, result)
          await socket.refresh(req, channels)
        }
      } catch(err) {
        console.log(err)
        await analytics.rollback(err)
        await maha.rollback(err)
      }
    })
  })
}

export default Queue
