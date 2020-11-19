import AnnouncementSerializer from '@apps/maha/serializers/announcement_serializer'
import Announcement from '@apps/maha/models/announcement'

const listRoute = async (req, res) => {

  const announcements = await Announcement.filterFetch({
    scope: (qb) => {
      qb.select('maha_announcements.*','maha_announcement_results.*')
      qb.innerJoin('maha_announcement_results','maha_announcement_results.announcement_id','maha_announcements.id')
      qb.whereNull('maha_announcements.deleted_at')
    },
    aliases: {
      bounce_rate: 'maha_announcement_results.bounce_rate',
      click_rate: 'maha_announcement_results.click_rate',
      open_rate: 'maha_announcement_results.open_rate',
      sent: 'maha_announcement_results.sent'
    },
    sort: {
      params: req.query.$sort,
      defaults:  '-created_at',
      allowed: ['id','title','program','direction','status','created_at']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(announcements, AnnouncementSerializer)

}

export default listRoute
