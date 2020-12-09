import EmailSerializer from '@apps/automation/serializers/email_serializer'
import Email from '@apps/automation/models/email'

const showRoute = async (req, res) => {

  const email = await Email.query(qb => {
    qb.select('automation_emails.*','automation_email_results.*')
    qb.innerJoin('automation_email_results','automation_email_results.email_id','automation_emails.id')
    qb.where('automation_emails.team_id', req.team.get('id'))
    qb.where('automation_emails.id', req.params.id)
  }).fetch({
    withRelated: ['event','form','program','workflow'],
    transacting: req.trx
  })

  if(!email) return res.status(404).respond({
    code: 404,
    message: 'Unable to load email'
  })

  res.status(200).respond(email, EmailSerializer)

}

export default showRoute
