import AssignmentSerializer from '../../../serializers/assignment_serializer'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Assignment from '../../../models/assignment'

const updateRoute = async (req, res) => {

  const assignment = await Assignment.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!assignment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load assignment'
  })

  const channels = [
    `/admin/trainings/offerings/${assignment.get('offering_id')}`,
    `/admin/trainings/offerings/${req.body.offering_id}`,
    `/admin/trainings/assignments/${assignment.get('id')}`
  ]

  await assignment.save({
    offering_id: req.body.offering_id
  }, {
    patch: true,
    transacting: req.trx
  })

  await audit(req, {
    story: 'regstration changed',
    auditable: assignment
  })

  // await activity(req, {
  //   story: 'registered for {object}',
  //   object: category
  // })

  await socket.refresh(req, channels)

  res.status(200).respond(assignment, AssignmentSerializer)

}

export default updateRoute
