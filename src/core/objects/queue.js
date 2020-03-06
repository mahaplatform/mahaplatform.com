import { beginLogger, endLogger, printQueueLogger } from '../utils/logger'
import Team from '../../apps/maha/models/team'
import knex from '../services/knex'
import redis from 'ioredis'
import moment from 'moment'
import Bull from 'bull'
import _ from 'lodash'

const defaults = {
  enqueue: async (req, job) => job,
  failed: async (job, err) => {}
}

class Queue {

  constructor(options) {
    this._enqueue = options.enqueue || defaults.enqueue
    this.name = options.name
    this.processor = options.processor
    this.failed = options.failed || defaults.failed
    this.completed = options.completed
    this.queue = new Bull(this.name, { createClient })
  }

  async start(options) {
    if(this.processor) this.queue.process(wrapped(this.name, this.processor))
    if(this.failed) this.fail(this.queue.on('failed', this.failed))
    if(this.completed) this.queue.on('completed', this.completed)
  }

  async enqueue(req, data, options = {}) {
    const job = await this._enqueue(req, data)
    if(process.env.NODE_ENV === 'test') return
    return await new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        const result = await this.queue.add({
          ...job,
          team_id: req.team ? req.team.get('id') : null
        }, {
          delay: options.until ? options.until.diff(moment()) : 2000,
          attempts: 3,
          backoff: 5000
        })
        resolve(result)
      }, 500)
    })
  }

  fail(method) {
    return async(job, err) => {
      if(process.env !== 'production') console.err(err)
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

const wrapped = (name, processor) => async (job, done) => {
  const processorWithTransaction = withTransaction(processor, job)
  const processorWithLogger = withLogger(name, processorWithTransaction, job)
  const is_prod = process.env.NODE_ENV === 'production'
  const envProcessor = !is_prod ? processorWithLogger : processorWithTransaction
  try {
    await envProcessor()
    done()
  } catch(err) {
    if(process.env.NODE_ENV !== 'production') console.error(err)
    done(err)
  }
}

const withLogger = (name, processor, job) => async () => {
  const requestId = _.random(100000, 999999).toString(36)
  beginLogger(requestId)
  await processor()
  printQueueLogger(name, job, requestId)
  endLogger(requestId)
}

const withTransaction = (processor, job) => async () => {
  await knex.transaction(async trx => {
    try {
      const team = job.data.team_id ? await Team.query(qb => {
        qb.where('id', job.data.team_id)
      }).fetch({
        withRelated: ['logo'],
        transacting: trx
      }) : null
      await processor({ team, trx }, job)
      await trx.commit()
    } catch(err) {
      await trx.rollback(err)
    }
  })
}

const redisUrl = process.env.REDIS_URL.replace('redis://','')
const redisDb = redisUrl.substring(redisUrl.indexOf('/') + 1, redisUrl.length)
const redisPort = redisUrl.substring(redisUrl.indexOf(':') + 1, redisUrl.indexOf('/'))
const redisHost = redisUrl.substring(0, redisUrl.indexOf(':'))

const client = new redis({
  port: redisPort,
  host: redisHost,
  db: redisDb,
  connectTimeout: 60000
})

const subscriber = new redis({
  port: redisPort,
  host: redisHost,
  db: redisDb,
  connectTimeout: 60000
})

const createClient = (type) => {
  if(type === 'client') return client
  if(type === 'subscriber') return subscriber
  return new redis({
    port: redisPort,
    host: redisHost,
    db: redisDb,
    connectTimeout: 60000
  })
}

export default Queue
