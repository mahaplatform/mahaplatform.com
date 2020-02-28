import EmailSerializer from '../../../../serializers/email_serializer'
import Workflow from '../../../../models/workflow'

const listRoute = async (req, res) => {

  const workflow = await Workflow.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.workflow_id)
  }).fetch({
    withRelated: ['emails.results'],
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  res.status(200).respond(workflow.related('emails'), EmailSerializer)

}

export default listRoute
