import TopicSerializer from '../../../../serializers/topic_serializer'
import { checkProgramAccess } from '../../../../services/programs'
import Topic from '../../../../models/topic'

const updateRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage']
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

  res.status(200).respond(topic, TopicSerializer)

}

export default updateRoute
