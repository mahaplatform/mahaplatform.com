import { importContactImport } from '../services/contactimport'
import socket from '../../../core/services/emitter'
import Queue from '../../../core/objects/queue'

const processor = async (req, job) => {
  const { import_id, profile_id, list_id } = job.data
  await importContactImport(req, {
    import_id,
    profile_id,
    list_id
  })
}

const failed = async (job, err) => {
  await socket.in(`/admin/imports/${job.data.import_id}`).emit('message', {
    target: `/admin/imports/${job.data.import_id}`,
    action: 'failed',
    data: [job,err]
  })
}

const ContactImportImportQueue = new Queue({
  name: 'contactimport_import',
  processor,
  failed
})

export default ContactImportImportQueue
