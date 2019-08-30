import TopicSerializer from '../../../serializers/topic_serializer'
import Topic from '../../../models/topic'

const listRoute = async (req, res) => {

  const topics = await Topic.scope({
    team: req.team
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(topics, TopicSerializer)

}

export default listRoute
