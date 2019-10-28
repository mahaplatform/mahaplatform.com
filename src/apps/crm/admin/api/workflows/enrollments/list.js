import EnrollmentSerializer from '../../../../serializers/enrollment_serializer'
import Enrollment from '../../../../models/enrollment'
import Workflow from '../../../../models/workflow'

const listRoute = async (req, res) => {

  const workflow = await Workflow.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('code', req.params.workflow_id)
  }).fetch({
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  const workflows = await Enrollment.scope(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('workflow_id', workflow.get('id'))
  }).filter({
    filter: req.query.$filter,
    filterParams: ['was_converted']
  }).sort({
    defaultSort:  '-created_at',
    sortParams: ['created_at']
  }).fetchPage({
    withRelated: ['contact.photo'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(workflows, EnrollmentSerializer)

}

export default listRoute
