import EmailSerializer from '../../../../serializers/email_serializer'
import Workflow from '../../../../models/workflow'
import Email from '../../../../models/email'

const listRoute = async (req, res) => {

  const workflow = await Workflow.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.workflow_id)
  }).fetch({
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  const emails = await Email.filterFetch({
    scope: (qb) => {
      qb.select('crm_emails.*','crm_email_results.*')
      qb.innerJoin('crm_email_results','crm_email_results.email_id','crm_emails.id')
      qb.where('crm_emails.workflow_id', workflow.get('id'))
      qb.where('crm_emails.team_id', req.team.get('id'))
      qb.whereNull('crm_emails.deleted_at')
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

export default listRoute
