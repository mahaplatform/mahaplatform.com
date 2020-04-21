import TopicSerializer from '../../../serializers/topic_serializer'
import Topic from '../../../models/topic'

const listRoute = async (req, res) => {

  const topics = await Topic.filterFetch({
    scope: qb => {
      qb.select('crm_topics.*','crm_topic_totals.*')
      qb.innerJoin('crm_topic_totals', 'crm_topic_totals.topic_id', 'crm_topics.id')
      qb.where('crm_topics.team_id', req.team.get('id'))
    },
    filter: {
      params: req.params.$filter,
      allowed: ['program_id']
    },
    sort: {
      params: req.params.$sort,
      defaults: ['title']
    },
    page: req.query.$page,
    withRelated: ['program.logo'],
    transacting: req.trx
  })

  res.status(200).respond(topics, TopicSerializer)

}

export default listRoute
