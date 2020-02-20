import AssignmentSerializer from '../../../serializers/assignment_serializer'

import Assignment from '../../../models/assignment'

const reportRoute = async (req, res) => {

  const assignments = await Assignment.filterFetch({
    scope: (qb) => {
      qb.joinRaw('inner join maha_supervisions on maha_supervisions.employee_id=training_assignments.user_id and maha_supervisions.supervisor_id=?', req.user.get('id'))
      qb.where('training_assignments.team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['user_id']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-training_assignments.created_at'
    },
    withRelated: ['assigning.assigned_by','user'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(assignments, AssignmentSerializer)

}

export default reportRoute
