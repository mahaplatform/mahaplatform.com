import AssignmentSerializer from '../../../serializers/assignment_serializer'

import Assignment from '../../../models/assignment'

const reportRoute = async (req, res) => {

  const assignments = await Assignment.scope({
    team: req.team
  }).filter({
    filterParams: ['employee_id'],
    filter: req.query.$filter
  }).sort({
    sort: req.query.$sort,
    defaultSort: '-training_assignments.created_at'
  }).fetchPage({
    withRelated: ['training','employee'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(assignments, AssignmentSerializer)

}

export default reportRoute
