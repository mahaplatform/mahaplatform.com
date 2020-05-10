import WorkflowActionSerializer from '../../../../../crm/serializers/workflow_action_serializer'
import WorkflowAction from '../../../../../crm/models/workflow_action'
import Registration from '../../../../models/registration'

const actionsRoute = async (req, res) => {

  const registration = await Registration.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('event_id', req.params.event_id)
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['enrollment'],
    transacting: req.trx
  })

  if(!registration) return res.status(404).respond({
    code: 404,
    message: 'Unable to load registration'
  })

  console.log(registration)

  const actions = await WorkflowAction.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('enrollment_id', registration.related('enrollment').get('id'))
    qb.orderBy('created_at', 'asc')
  }).fetchAll({
    withRelated: ['asset','email','field','list','program','recording','topic','step','user','workflow'],
    transacting: req.trx
  })

  res.status(200).respond(actions, WorkflowActionSerializer)

}

export default actionsRoute
