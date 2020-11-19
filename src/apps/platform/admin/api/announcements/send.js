import SendAnnouncementQueue from '@apps/platform/queues/send_announcement_queue'
import Announcement from '@apps/maha/models/announcement'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import moment from 'moment'

const getSendAt = ({ strategy, date, time }) => {
  if(strategy === 'now') return moment().add(10, 'seconds')
  return moment(`${date} ${time}`)
}

const sendRoute = async (req, res) => {

  const announcement = await Announcement.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!announcement) return res.status(404).respond({
    code: 404,
    message: 'Unable to load announcement'
  })

  await announcement.save({
    to: req.body.to
  }, {
    transacting: req.trx,
    patch: true
  })

  const send_at = getSendAt(req.body)

  const job = await SendAnnouncementQueue.enqueue(req, {
    announcement_id: announcement.get('id')
  }, {
    until: moment(send_at)
  })

  await announcement.save({
    send_at,
    status: 'scheduled',
    job_id: job.id
  }, {
    transacting: req.trx,
    patch: true
  })

  await audit(req, {
    story: 'scheduled',
    auditable: announcement
  })

  await socket.refresh(req, [
    '/admin/platform/announcements',
    `/admin/platform/announcements/${announcement.id}`
  ])

  res.status(200).respond(true)

}

export default sendRoute
