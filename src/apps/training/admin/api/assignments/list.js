import AssignmentSerializer from '../../../serializers/assignment_serializer'
import Assignment from '../../../models/assignment'

const listRoute = async (req, res) => {

  const assignments = await Assignment.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('user_id', req.user.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['user_id']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-training_assignments.created_at'
    },
    page: req.query.$page,
    withRelated: ['assigning.assigned_by','user'],
    transacting: req.trx
  })

  res.status(200).respond(assignments, AssignmentSerializer)

}

export default listRoute
