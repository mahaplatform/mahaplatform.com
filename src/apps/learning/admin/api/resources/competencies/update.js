import { updateRelated } from '../../../../../../core/services/routes/relations'
import socket from '../../../../../../core/services/routes/emitter'
import Resource from '../../../../models/resource'

const updateRoute = async (req, res) => {

  const resource = await Resource.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.resource_id)
  }).fetch({
    transacting: req.trx
  })

  if(!resource) return res.status(404).respond({
    code: 404,
    message: 'Unable to load resource'
  })

  await updateRelated(req, {
    object: resource,
    related: 'competencies',
    table: 'competencies_competencies_resources',
    ids: req.body.assignments.map(assignment => assignment.competency_id),
    foreign_key: 'resource_id',
    related_foreign_key: 'competency_id'
  })

  await socket.refresh(req, [
    `/admin/learning/resources/${req.params.resource_id}`
  ])

  res.status(200).respond(true)

}

export default updateRoute
