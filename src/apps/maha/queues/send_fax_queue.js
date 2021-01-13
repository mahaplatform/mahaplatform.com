import socket from '@core/services/routes/emitter'
import Queue from '@core/objects/queue'
import { queueFax } from '../services/faxes'

const processor = async (req, job) => {

  await queueFax(req, {
    id: job.data.id
  })

  await socket.refresh(req, [
    '/admin/fax/faxes/outgoing',
    '/admin/team/faxes'
  ])

}

const SendFaxQueue = new Queue({
  queue: 'worker',
  name: 'send_fax',
  processor
})

export default SendFaxQueue
