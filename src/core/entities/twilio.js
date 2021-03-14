import { startQueues } from '@core/services/queues'

const twilio = () => {
  startQueues('twilio')
}

export default twilio
