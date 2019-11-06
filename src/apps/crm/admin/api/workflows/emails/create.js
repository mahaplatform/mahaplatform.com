import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import EmailSerializer from '../../../../serializers/email_serializer'
import generateCode from '../../../../../../core/utils/generate_code'
import socket from '../../../../../../core/services/routes/emitter'
import Workflow from '../../../../models/workflow'
import Email from '../../../../models/email'

const createRoute = async (req, res) => {

  const workflow = await Workflow.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.workflow_id)
  }).fetch({
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  const code = await generateCode(req, {
    table: 'crm_emails'
  })

  const email = await Email.forge({
    team_id: req.team.get('id'),
    workflow_id: workflow.get('id'),
    code,
    ...whitelist(req.body, ['sender_id','title','subject','reply_to','config'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: email
  })

  await socket.refresh(req, [
    `/admin/crm/workflows/${workflow.get('id')}`
  ])

  res.status(200).respond(email, EmailSerializer)

}

export default createRoute
