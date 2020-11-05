import EmailSerializer from '@apps/automation/serializers/email_serializer'
import Email from '@apps/automation/models/email'

const showRoute = async (req, res) => {

  const email = await Email.query(qb => {
    qb.select('crm_emails.*','crm_email_results.*')
    qb.innerJoin('crm_email_results','crm_email_results.email_id','crm_emails.id')
    qb.where('crm_emails.team_id', req.team.get('id'))
    qb.where('crm_emails.id', req.params.id)
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
