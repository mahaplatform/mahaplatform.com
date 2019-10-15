import { updateRelated } from '../../../../../../core/services/routes/relations'
import socket from '../../../../../../core/services/routes/emitter'
import Supervisor from '../../../../../maha/models/supervisor'

const updateRoute = async (req, res) => {

  const supervisor = await Supervisor.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!supervisor) return res.status(404).respond({
    code: 404,
    message: 'Unable to load supervisor'
  })

  await updateRelated(req, {
    object: supervisor,
    related: 'employees',
    table: 'maha_supervisions',
    ids: req.body.assignments.map(assignment => assignment.user_id),
    primary_key: 'user_id',
    foreign_key: 'supervisor_id',
    related_foreign_key: 'employee_id'
  })

  await socket.refresh(req, [
    `/admin/team/supervisors/${req.params.id}`
  ])

  res.status(200).respond(true)

}

export default updateRoute
