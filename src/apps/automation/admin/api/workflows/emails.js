import EmailSerializer from '@apps/automation/serializers/email_serializer'
import Workflow from '@apps/automation/models/workflow'
import Email from '@apps/automation/models/email'

const emailsRoute = async (req, res) => {

  const workflow = await Workflow.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  const emails = await Email.filterFetch({
    scope: (qb) => {
      qb.select('automation_emails.*','automation_email_results.*')
      qb.innerJoin('automation_email_results','automation_email_results.email_id','automation_emails.id')
      qb.where('automation_emails.workflow_id', workflow.get('id'))
      qb.where('automation_emails.team_id', req.team.get('id'))
      qb.whereNull('automation_emails.deleted_at')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['id']
    },
    withRelated: ['event','form','program','workflow'],
    transacting: req.trx
  })

  res.status(200).respond(emails, EmailSerializer)

}

export default emailsRoute
