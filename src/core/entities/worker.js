import { startQueues } from '@core/services/queues'

const worker = () => {
  startQueues('worker')
}

export default worker
