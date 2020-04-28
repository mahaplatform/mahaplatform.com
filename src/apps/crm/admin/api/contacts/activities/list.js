import ActivitySerializer from '../../../../serializers/activity_serializer'
import Activity from '../../../../models/activity'
import Contact from '../../../../models/contact'

const listRoute = async (req, res) => {

  const contact = await Contact.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  const activities = await Activity.filterFetch({
    scope: (qb) => {
      qb.joinRaw('left join crm_program_user_access on crm_program_user_access.program_id=crm_activities.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.whereRaw('(crm_activities.program_id is null or crm_program_user_access.program_id is not null)')
      qb.where('crm_activities.team_id', req.team.get('id'))
      qb.where('crm_activities.contact_id', contact.get('id'))
      qb.orderBy('created_at', 'desc')
    },
    page: req.query.$page,
    withRelated: ['call','note','program.logo','story','user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(activities, ActivitySerializer)

}

export default listRoute
