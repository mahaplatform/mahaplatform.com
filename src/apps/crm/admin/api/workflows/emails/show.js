import EmailSerializer from '../../../../serializers/email_serializer'
import Workflow from '../../../../models/workflow'
import Email from '../../../../models/email'

const showRoute = async (req, res) => {

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

  const email = await Email.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('workflow_id', workflow.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['sender'],
    transacting: req.trx
  })

  res.status(200).respond(email, EmailSerializer)

}

export default showRoute
