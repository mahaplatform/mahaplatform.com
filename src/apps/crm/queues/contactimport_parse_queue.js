import { parseContactImport } from '../services/contactimport'
import socket from '@core/vendor/emitter'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {
  await parseContactImport(req, {
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

const ContactImportParseQueue = new Queue({
  name: 'contactimport_parse',
  processor,
  failed
})

export default ContactImportParseQueue
