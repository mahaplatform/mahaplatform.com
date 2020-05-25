import Logger from '../services/logger'
import knex from '../services/knex'

const cron = (options) => ({
  name: options.name,
  schedule: options.schedule,
  handler: wrapped({
    title: options.name,
    processor: options.processor,
    afterCommit: options.afterCommit,
    beforeRollback: options.beforeRollback
  })
})

const wrapped = ({ title, processor, afterCommit, beforeRollback }) => async () => {
  try {
    const processorWithLogger = withLogger(title, processor)
    const processorWithTransaction = withTransaction(processorWithLogger, afterCommit, beforeRollback)
    await processorWithTransaction()
  } catch(err) {}
}

const withLogger = (title, processor) => async (req) => {
  const logger = new Logger('cron')
  logger.begin(req)
  try {
    await processor(req)
    logger.info(req, title)
  } catch(err) {
    logger.error(req, title, null, err)
    throw(err)
  }
}

const withTransaction = (processor, afterCommit, beforeRollback) => async () => {
  await knex.transaction(async trx => {
    try {
      const req = { trx }
      const result = await processor(req)
      await trx.commit()
      if(afterCommit) await afterCommit(req, result)
    } catch(err) {
      if(beforeRollback) await beforeRollback()
      await trx.rollback(err)
    }
  })
}

export default cron
