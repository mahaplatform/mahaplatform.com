import AnnouncementSerializer from '@apps/maha/serializers/announcement_serializer'
import { getAccounts } from '@apps/maha/services/accounts'
import Announcement from '@apps/maha/models/announcement'

const getRecipientCount = async (req, { announcement }) => {

  if(announcement.get('status') === 'sent') {

    await announcement.load(['emails'], {
      transacting: req.trx
    })

    return announcement.related('emails').length

  }

  if(!announcement.get('to')) return 0

  const recipients = await getAccounts(req, {
    ...announcement.get('to')
  })

  return recipients.length

}

const showRoute = async (req, res) => {

  const announcement = await Announcement.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!announcement) return res.status(404).respond({
    code: 404,
    message: 'Unable to load announcement'
  })

  const recipient_count = await getRecipientCount(req, {
    announcement
  })

  announcement.set('recipients', recipient_count)

  await res.status(200).respond(announcement, AnnouncementSerializer)

}

export default showRoute
