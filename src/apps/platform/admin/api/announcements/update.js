import AnnouncementSerializer from '@apps/maha/serializers/announcement_serializer'
import GenerateScreenshotQueue from '@apps/maha/queues/generate_screenshot_queue'
import { activity } from '@core/services/routes/activities'
import Announcement from '@apps/maha/models/announcement'
import { whitelist } from '@core/services/routes/params'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'

const updateRoute = async (req, res) => {

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
    ...whitelist(req.body, ['title','config'])
  }, {
    transacting: req.trx
  })

  await GenerateScreenshotQueue.enqueue(req, {
    announcement_id: announcement.get('id')
  })

  await audit(req, {
    story: 'updated',
    auditable: announcement
  })

  await activity(req, {
    story: 'updated {object}',
    object: announcement
  })

  await socket.refresh(req, [
    '/admin/platform/announcements',
    `/admin/platform/announcements/${announcement.id}`
  ])

  await res.status(200).respond(announcement, AnnouncementSerializer)

}

export default updateRoute
