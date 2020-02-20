import EmailActivitySerializer from '../../../../serializers/email_activity_serializer'
import EmailActivity from '../../../../../maha/models/email_activity'

const activitiesRoute = async (req, res) => {

  const activities = await EmailActivity.filterFetch({
    scope: (qb) => {
      qb.innerJoin('maha_emails','maha_emails.id','maha_email_activities.email_id')
      qb.where('maha_email_activities.team_id', req.team.get('id'))
      qb.whereNot('maha_email_activities.type', 'delivery')
      qb.where('maha_emails.email_campaign_id', req.params.id)
    },
    filter: {
      params: req.query.$filter,
      allowed: ['program_id','type','is_mobile']
    },
    sort: {
      params:  '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['link','email.contact.photo'],
    transacting: req.trx
  })

  res.status(200).respond(activities, EmailActivitySerializer)

}

export default activitiesRoute
