import EmailResultSerializer from '../../../serializers/email_result_serializer'
import Email from '../../../models/email'

const performanceRoute = async (req, res) => {

  const email = await Email.query(qb => {
    qb.select('crm_emails.*','crm_email_results.*')
    qb.innerJoin('crm_email_results','crm_email_results.email_id','crm_emails.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!email) return res.status(404).respond({
    code: 404,
    message: 'Unable to load email'
  })

  res.status(200).respond(email, EmailResultSerializer)

}

export default performanceRoute
