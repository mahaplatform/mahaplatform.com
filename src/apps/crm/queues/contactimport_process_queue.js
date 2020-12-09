import { processContactImport } from '../services/contactimport'
import socket from '@core/vendor/emitter'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {
  await processContactImport(req, {
    import_id: job.data.import_id
  })
}

const failed = async (job, err) => {
  await socket.in(`/admin/imports/${job.data.import_id}`).emit('message', {
    target: `/admin/imports/${job.data.import_id}`,
    action: 'failed',
    data: [job,err]
  })
}

const ContactImportProcessQueue = new Queue({
  name: 'contactimport_process',
  processor,
  failed
})

export default ContactImportProcessQueue
