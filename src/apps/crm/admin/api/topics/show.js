import TopicSerializer from '../../../serializers/topic_serializer'
import Topic from '../../../models/topic'

const showRoute = async (req, res) => {

  const topic = await Topic.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  res.status(200).respond(topic, TopicSerializer)

}

export default showRoute
