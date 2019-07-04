import AssignmentSerializer from '../../../serializers/assignment_serializer'
import Assignment from '../../../models/assignment'

const listRoute = async (req, res) => {

  const assignments = await Assignment.scope({
    team: req.team
  }).filter({
    filterParams: ['employee_id'],
    filter: req.query.$filter
  }).sort({
    sort: req.query.$sort,
    defaultSort: '-learning_assignments.created_at'
  }).fetchPage({
    withRelated: ['training','employee.photo'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(assignments, AssignmentSerializer)

}

export default listRoute
