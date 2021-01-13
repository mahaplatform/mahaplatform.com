import createRedisClient from '@core/utils/create_redis_client'
import socket from '@core/services/routes/emitter'
import Logger from '@core/services/logger'
import * as knex from '@core/vendor/knex'
import Team from '@apps/maha/models/team'
import moment from 'moment'
import Bull from 'bull'

const queues = {}

const getQueue = (name) => {
  if(queues[name]) return queues[name]
  queues[name] = new Bull(name, {
    createClient: createRedisClient
  })
  return queues[name]
}


class Queue {

  constructor(options) {
    this.processor = this._getProcessor(options.processor)
    this.completed = this._getCompleted(options.completed)
    this.failed = this._getFailed(options.failed)
    this.concurrency = options.concurrency || 1
    this.priority = options.priority || 10
    this.attempts = options.attempts || 3
    this.queue = getQueue(options.queue)
    this.queueName = options.queue
    this.name = options.name
    this.cron = options.cron
    this.path = options.path
    this.refresh = options.refresh
  }

  async enqueue(req = {}, job = {}, options = {}) {
    await new Promise((resolve) => {
      setTimeout(resolve, 500)
    })
    job.team_id = req.team ? req.team.get('id') : null
    return await this.queue.add(this.name, job, {
      priority: this.priority,
      delay: options.until ? options.until.diff(moment()) : 2000,
      attempts: this.attempts,
      repeat: this.cron ? { cron: this.cron } : null,
      backoff: {
        type: 'exponential',
        delay: 5000
      },
      removeOnComplete: true
    })
  }

  async start() {
    this.queue.process(this.name, this.concurrency, this.processor)
    if(this.cron) await this.startCron()
  }

  async startCron() {
    const jobs = await this.queue.getRepeatableJobs()
    await Promise.mapSeries(jobs, async(job) => {
      if(job.name !== this.name) return
      await this.queue.removeRepeatableByKey(job.key)
    })
    this.enqueue()
  }

  _getProcessor(processor) {
    const withTeam = this._withTeam(processor)
    const withLogger = this._withLogger(withTeam)
    const withtransaction = this._withTransaction(withLogger)
    return this._withCallbacks(withtransaction)
  }

  _getCompleted(completed) {
    if(!completed) return () => {}
    return completed
  }

  _getFailed(failed) {
    return async(job, err) => {
      if(failed) await failed(job, err)
    }
  }

  _withCallbacks(processor) {
    return async (job) => {
      try {
        await processor(job)
        await this.completed()
      } catch(err) {
        await this.failed(job, err)
        throw err
      }
    }
  }

  _withLogger(processor) {
    return async (req, job) => {
      const logger = new Logger(this.queueName)
      logger.begin(req)
      const data = {
        id: job.id,
        job: job.data
      }
      try {
        await processor(req, job)
        logger.info(req, this.name, data)
      } catch(err) {
        logger.error(req, this.name, data, err)
        throw(err)
      }
    }
  }

  _withTransaction(processor) {
    return async (job) => {
      return knex.analytics.transaction(async analytics => {
        return await knex.maha.transaction(async maha => {
          const req = {}
          req.analytics = analytics
          req.maha = maha
          req.trx = maha
          const result = await processor(req, job)
          if(this.refresh) {
            const channels = await this.refresh(req, job, result)
            await socket.refresh(req, channels)
          }
        })
      })
    }
  }

  _withTeam(processor) {
    return async (req, job) => {
      req.team = job.data.team_id ? await Team.query(qb => {
        qb.where('id', job.data.team_id)
      }).fetch({
        transacting: req.maha
      }) : null
      await processor(req, job)
    }
  }

}

export default Queue
