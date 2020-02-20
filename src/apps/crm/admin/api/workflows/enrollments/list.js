import EnrollmentSerializer from '../../../../serializers/enrollment_serializer'
import Enrollment from '../../../../models/enrollment'
import Workflow from '../../../../models/workflow'

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

  const workflows = await Enrollment.filter({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('workflow_id', workflow.get('id'))
    },
    filter: req.query.$filter,
    filterParams: ['was_converted'],
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
