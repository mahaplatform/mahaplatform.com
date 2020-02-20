import AssignmentSerializer from '../../../serializers/assignment_serializer'
import Assignment from '../../../models/assignment'

const listRoute = async (req, res) => {

  const assignments = await Assignment.filter({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('user_id', req.user.get('id'))
    },
    filterParams: ['user_id'],
    filter: req.query.$filter,
    sort: req.query.$sort,
    defaultSort: '-training_assignments.created_at'
  }).fetchPage({
    withRelated: ['assigning.assigned_by','user'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(assignments, AssignmentSerializer)

}

export default listRoute
