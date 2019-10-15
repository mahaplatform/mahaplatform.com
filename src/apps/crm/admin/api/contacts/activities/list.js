import ActivitySerializer from '../../../../serializers/activity_serializer'
import Activity from '../../../../models/activity'
import Contact from '../../../../models/contact'

const listRoute = async (req, res) => {

  const contact = await Contact.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  const activities = await Activity.scope(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('contact_id', contact.get('id'))
  }).query(qb => {
    qb.orderBy('created_at', 'desc')
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['call','note','story','user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(activities, ActivitySerializer)

}

export default listRoute
