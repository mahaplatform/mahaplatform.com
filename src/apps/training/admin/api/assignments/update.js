import AssignmentSerializer from '../../../serializers/assignment_serializer'
import socket from '../../../../../core/services/routes/emitter'
import { chooseOption } from '../../../services/assignments'
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

  await chooseOption(req, assignment, {
    option_id: req.body.option_id
  })

  // await audit(req, {
  //   story: 'regstration changed',
  //   auditable: assignment
  // })

  // await activity(req, {
  //   story: 'registered for {object}',
  //   object: category
  // })

  await socket.refresh(req, [
    `/admin/training/assignments/${assignment.get('id')}`
  ])

  res.status(200).respond(assignment, AssignmentSerializer)

}

export default updateRoute
