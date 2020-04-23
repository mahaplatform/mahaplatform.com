import TopicSerializer from '../../../serializers/topic_serializer'
import Topic from '../../../models/topic'

const showRoute = async (req, res) => {

  const topic = await Topic.query(qb => {
    qb.joinRaw('inner join crm_programs on crm_programs.id=crm_topics.program_id')
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('crm_topics.team_id', req.team.get('id'))
    qb.where('crm_topics.id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  res.status(200).respond(topic, TopicSerializer)

}

export default showRoute
