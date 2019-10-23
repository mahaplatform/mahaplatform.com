import TopicSerializer from '../../../serializers/topic_serializer'
import Topic from '../../../models/topic'

const listRoute = async (req, res) => {

  const topics = await Topic.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(topics, TopicSerializer)

}

export default listRoute
