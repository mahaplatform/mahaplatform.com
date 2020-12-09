import WorkflowActionSerializer from '@apps/automation/serializers/action_serializer'
import WorkflowAction from '@apps/automation/models/action'
import Response from '@apps/forms/models/response'

const actionsRoute = async (req, res) => {

  const response = await Response.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('form_id', req.params.form_id)
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['enrollment'],
    transacting: req.trx
  })

  if(!response) return res.status(404).respond({
    code: 404,
    message: 'Unable to load response'
  })

  const actions = await WorkflowAction.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('enrollment_id', response.related('enrollment').get('id'))
    qb.orderBy('created_at', 'asc')
  }).fetchAll({
    withRelated: ['asset','email','field','list','program','recording','topic','step','user','workflow'],
    transacting: req.trx
  })

  res.status(200).respond(actions, WorkflowActionSerializer)

}

export default actionsRoute
