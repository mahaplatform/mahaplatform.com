import AssignmentSerializer from '../../../serializers/assignment_serializer'

import Assignment from '../../../models/assignment'

const reportRoute = async (req, res) => {

  const assignments = await Assignment.filter({
    scope: (qb) => {
      qb.joinRaw('inner join maha_supervisions on maha_supervisions.employee_id=training_assignments.user_id and maha_supervisions.supervisor_id=?', req.user.get('id'))
      qb.where('training_assignments.team_id', req.team.get('id'))
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

export default reportRoute
