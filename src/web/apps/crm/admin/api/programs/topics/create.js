import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import TopicSerializer from '../../../../serializers/topic_serializer'
import socket from '../../../../../../core/services/routes/emitter'
import Topic from '../../../../models/topic'

const createRoute = async (req, res) => {

  const topic = await Topic.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['program_id','title'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: topic
  })

  await socket.refresh(req, [
    '/admin/crm/topics'
  ])

  res.status(200).respond(topic, TopicSerializer)

}

export default createRoute
