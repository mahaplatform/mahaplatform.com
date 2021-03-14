import { startQueues } from '@core/services/queues'

const cron = () => {
  startQueues('cron')
}

export default cron
