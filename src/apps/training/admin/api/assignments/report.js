import AssignmentSerializer from '../../../serializers/assignment_serializer'
import Assignment from '../../../models/assignment'

const reportRoute = async (req, res) => {

  const assignments = await Assignment.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filterParams: ['assigning_id','user_id'],
    filter: req.query.$filter
  }).sort({
    sort: req.query.$sort,
    defaultSort: '-training_assignments.created_at'
  }).fetchPage({
    withRelated: ['assigning.assigned_by','user'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(assignments, AssignmentSerializer)

}

export default reportRoute
