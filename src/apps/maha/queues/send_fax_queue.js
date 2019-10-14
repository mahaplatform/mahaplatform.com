import socket from '../../../core/services/routes/emitter'
import Queue from '../../../core/objects/queue'
import { queueFax } from '../services/faxes'

const processor = async (job, trx) => {

  await queueFax({ trx }, {
    id: job.data.id
  })

  await socket.refresh({ trx }, [
    '/admin/fax/faxes/outgoing',
    '/admin/team/faxes'
  ])


}

const failed = async (job, err, trx) => {}

const SendFaxQueue = new Queue({
  name: 'send_fax',
  enqueue: async (req, job) => job,
  processor,
  failed
})

export default SendFaxQueue
