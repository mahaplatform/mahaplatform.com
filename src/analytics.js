import '@core/vendor/sourcemaps'
import '@core/services/environment'
import log from '@core/utils/log'
import archiveRawsCron from '@analytics/cron/archive_raws_cron'
import updateMaxMindCron from '@analytics/cron/update_maxmind_cron'
import validateQueue from '@analytics/queues/validate_queue'
import enrichQueue from '@analytics/queues/enrich_queue'
import modelQueue from '@analytics/queues/model_queue'

const queues = [
  archiveRawsCron,
  updateMaxMindCron,
  validateQueue,
  enrichQueue,
  modelQueue
]

queues.map(queue => {
  log('info', 'analytics', `Starting ${queue.name}`)
  queue.start()
})
