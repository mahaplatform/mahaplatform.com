import { activity } from '@core/services/routes/activities'
import socket from '@core/services/routes/emitter'
import { checkProgramAccess } from '@apps/crm/services/programs'
import { deleteTopic } from '@apps/crm/services/topics'
import Topic from '@apps/crm/models/topic'

const destroyRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const topic = await Topic.query(qb => {
    qb.where('crm_topics.program_id', req.params.program_id)
    qb.where('crm_topics.team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!topic) return res.status(404).respond({
    code: 404,
    message: 'Unable to load topic'
  })

  await deleteTopic(req, {
    topic
  })

  await activity(req, {
    story: 'deleted {object}',
    object: topic
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${req.params.program_id}`,
    `/admin/crm/programs/${req.params.program_id}/topic/${req.params.id}`
  ])

  await res.status(200).respond(true)

}

export default destroyRoute
