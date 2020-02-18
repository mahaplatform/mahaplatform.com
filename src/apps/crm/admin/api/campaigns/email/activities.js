import EmailActivitySerializer from '../../../../serializers/email_activity_serializer'
import EmailActivity from '../../../../../maha/models/email_activity'

const activitiesRoute = async (req, res) => {

  const activities = await EmailActivity.scope(qb => {
    qb.innerJoin('maha_emails','maha_emails.id','maha_email_activities.email_id')
    qb.where('maha_email_activities.team_id', req.team.get('id'))
    qb.whereNot('maha_email_activities.type', 'delivery')
    qb.where('maha_emails.email_campaign_id', req.params.id)
  }).filter({
    filter: req.query.$filter,
    filterParams: ['program_id','type','is_mobile']
  }).sort({
    defaultSort:  '-created_at',
    sortParams: ['created_at']
  }).fetchPage({
    withRelated: ['link','email.contact.photo'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(activities, EmailActivitySerializer)

}

export default activitiesRoute
