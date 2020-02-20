import { updateRelated } from '../../../../../../core/services/routes/relations'
import socket from '../../../../../../core/services/routes/emitter'
import Competency from '../../../../models/competency'

const updateRoute = async (req, res) => {

  const competency = await Competency.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.competency_id)
  }).fetch({
    transacting: req.trx
  })

  if(!competency) return res.status(404).respond({
    code: 404,
    message: 'Unable to load competency'
  })

  await updateRelated(req, {
    object: competency,
    related: 'resources',
    table: 'competencies_competencies_resources',
    ids: req.body.assignments.map(assignment => assignment.resource_id),
    foreign_key: 'competency_id',
    related_foreign_key: 'resource_id'
  })

  await socket.refresh(req, [
    `/admin/learning/competencies/${req.params.competency_id}`
  ])

  res.status(200).respond(true)

}

export default updateRoute
