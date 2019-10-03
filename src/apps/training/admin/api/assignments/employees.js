import AssignmentSerializer from '../../../serializers/assignment_serializer'

import Assignment from '../../../models/assignment'

const reportRoute = async (req, res) => {

  const assignments = await Assignment.scope({
    team: req.team
  }).query(qb => {
    qb.joinRaw('inner join maha_supervisions on maha_supervisions.employee_id=training_assignments.user_id and maha_supervisions.supervisor_id=?', req.user.get('id'))
  }).filter({
    filterParams: ['user_id'],
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
