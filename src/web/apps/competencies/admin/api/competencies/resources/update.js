import { updateRelated } from '../../../../../../core/services/routes/relations'
import socket from '../../../../../../core/services/routes/emitter'
import Competency from '../../../../models/competency'

const updateRoute = async (req, res) => {

  const competency = await Competency.scope({
    team: req.team
  }).query(qb => {
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
    primary_key: 'competency_id',
    foreign_key: 'resource_id'
  })

  await socket.refresh(req, [
    `/admin/competencies/competencies/${req.params.competency_id}`
  ])

  res.status(200).respond(true)

}

export default updateRoute
