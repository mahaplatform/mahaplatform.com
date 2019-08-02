import ActivitySerializer from '../../../../serializers/activity_serializer'
import Activity from '../../../../models/activity'
import Contact from '../../../../models/contact'

const listRoute = async (req, res) => {

  const contact = await Contact.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  const activities = await Activity.scope({
    team: req.team
  }).query(qb => {
    qb.where('contact_id', contact.get('id'))
    qb.orderBy('created_at', 'desc')
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['call','email','note','story','user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(activities, ActivitySerializer)

}

export default listRoute
