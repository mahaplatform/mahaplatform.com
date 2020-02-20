import TopicSerializer from '../../../../serializers/topic_serializer'
import { checkProgramAccess } from '../../../../services/programs'
import Topic from '../../../../models/topic'

const listRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage','edit','view']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const topics = await Topic.filter({
    scope: (qb) => {
      qb.select('crm_topics.*','crm_topic_totals.*')
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_topics.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.innerJoin('crm_topic_totals', 'crm_topic_totals.topic_id', 'crm_topics.id')
      qb.where('crm_topics.team_id', req.team.get('id'))
      qb.where('crm_topics.program_id', req.params.program_id)
    }
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(topics, TopicSerializer)

}

export default listRoute
