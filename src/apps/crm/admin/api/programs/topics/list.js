import TopicSerializer from '../../../../serializers/topic_serializer'
import Topic from '../../../../models/topic'

const listRoute = async (req, res) => {

  const topics = await Topic.scope(qb => {
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_topics.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('crm_topics.team_id', req.team.get('id'))
    qb.where('crm_topics.program_id', req.params.program_id)
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(topics, TopicSerializer)

}

export default listRoute
