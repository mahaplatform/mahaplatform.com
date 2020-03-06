import Queue from '../../../core/objects/queue'
import { receive_email } from '../services/aws'

const processor = async (req, job) => {

  const { message_id } = job.data

  await receive_email(req, { message_id })

}

const ReceiveEmailQueue = new Queue({
  name: 'receive_email',
  processor
})

export default ReceiveEmailQueue
