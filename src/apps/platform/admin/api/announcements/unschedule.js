import SendAnnouncementQueue from '@apps/platform/queues/send_announcement_queue'
import Announcement from '@apps/maha/models/announcement'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'

const unscheduleRoute = async (req, res) => {

  const announcement = await Announcement.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!announcement) return res.status(404).respond({
    code: 404,
    message: 'Unable to load announcement'
  })

  if(!announcement.get('job_id')) return res.status(422).respond({
    code: 422,
    message: 'announcement is not scheduled'
  })

  const job = await SendAnnouncementQueue.queue.getJob(announcement.get('job_id'))

  await job.remove()

  await announcement.save({
    send_at: null,
    status: 'draft',
    job_id: null
  }, {
    transacting: req.trx,
    patch: true
  })

  await audit(req, {
    story: 'unscheduled',
    auditable: announcement
  })

  await socket.refresh(req, [
    '/admin/platform/announcements',
    `/admin/platform/announcements/${announcement.id}`
  ])

  res.status(200).respond(true)

}

export default unscheduleRoute
