import AssignmentSerializer from '../../../../serializers/assignment_serializer'
import Assignment from '../../../../models/assignment'

const assignmentsRoute = async (req, res) => {

  const assignments = await Assignment.scope({
    team: req.team
  }).query(qb => {
    qb.where('offering_id', req.params.offering_id)
  }).fetchAll({
    withRelated: ['employee.photo'],
    transacting: req.trx
  })

  res.status(200).respond(assignments, AssignmentSerializer)

}

export default assignmentsRoute
