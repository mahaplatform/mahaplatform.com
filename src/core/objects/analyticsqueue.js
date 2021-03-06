import createRedisClient from '@core/utils/create_redis_client'
import socket from '@core/services/routes/emitter'
import Logger from '@core/services/logger'
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

const getDefaultConcurrency = (name) => {
  if(name === 'analytics') return 25
  if(name === 'worker') return 25
  if(name === 'twilio') return 1
  if(name === 'cron') return 1
}

const getConcurrency = (name) => {
  return queues[name] === undefined ? getDefaultConcurrency(name) : 0
}

class Queue {

  constructor(knex, options) {
    this.processor = this._getProcessor(knex, options.processor, options.log)
    this.completed = this._getCompleted(options.completed)
    this.failed = this._getFailed(options.failed)
    this.concurrency = getConcurrency(options.queue)
    this.priority = options.priority || 10
    this.attempts = options.attempts || 3
    this.remove = options.remove || true
    this.queue = getQueue(options.queue)
    this.queueName = options.queue
    this.refresh = options.refresh
    this.name = options.name
    this.cron = options.cron
    this.path = options.path
  }

  async enqueue(req = {}, job = {}, options = {}) {
    await new Promise((resolve) => {
      setTimeout(resolve, 500)
    })
    if(req.team) job.team_id = req.team.get('id')
    return await this.queue.add(this.name, job, {
      priority: this.priority,
      delay: this._getDelay(options),
      attempts: this.attempts,
      repeat: this.cron ? { cron: this.cron } : null,
      backoff: {
        type: 'exponential',
        delay: 5000
      },
      removeOnComplete: this.remove
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

  _getDelay(options) {
    if(options.until) console.log('diff', options.until.diff(moment()))
    if(options.until) return options.until.diff(moment())
    if(this.delay) return this.delay
    return 2000
  }

  _getProcessor(knex, processor, log = true) {
    const withLogger = log ? this._withLogger(processor) : processor
    const withtransaction = this._withTransaction(knex, withLogger)
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

  _withTransaction(knex, processor) {
    return async (job) => {
      return await knex.transaction(async analytics => {
        const req = {}
        req.analytics = analytics
        const result = await processor(req, job)
        if(this.refresh) {
          const channels = await this.refresh(req, job, result)
          await socket.refresh(req, channels)
        }
      })
    }
  }

}

export default Queue
