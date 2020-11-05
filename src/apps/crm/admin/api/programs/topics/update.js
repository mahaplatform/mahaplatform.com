import { activity } from '@core/services/routes/activities'
import TopicSerializer from '@apps/crm/serializers/topic_serializer'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import { checkProgramAccess } from '@apps/crm/services/programs'
import Topic from '@apps/crm/models/topic'

const updateRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage','edit']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const topic = await Topic.query(qb => {
    qb.where('program_id', req.params.program_id)
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  await topic.save({
    title: req.body.title
  }, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'updated',
    auditable: topic
  })

  await activity(req, {
    story: 'updated {object}',
    object: topic
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${topic.get('program_id')}`
  ])

  res.status(200).respond(topic, TopicSerializer)

}

export default updateRoute
