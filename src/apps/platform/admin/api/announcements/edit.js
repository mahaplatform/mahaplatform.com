import Announcement from '@apps/maha/models/announcement'

const editRoute = async (req, res) => {

  const announcement = await Announcement.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!announcement) return res.status(404).respond({
    code: 404,
    message: 'Unable to load announcement'
  })

  await res.status(200).respond(announcement, (req, announcement) => ({
    title: announcement.get('title'),
    to: announcement.get('to')
  }))

}

export default editRoute
