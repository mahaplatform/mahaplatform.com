import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import TopicSerializer from '../../../../serializers/topic_serializer'
import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import { checkProgramAccess } from '../../../../services/programs'
import { createWorkflow } from '../../../../services/workflows'
import Topic from '../../../../models/topic'

const createRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage','edit']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const topic = await Topic.forge({
    team_id: req.team.get('id'),
    program_id: req.params.program_id,
    ...whitelist(req.body, ['title'])
  }).save(null, {
    transacting: req.trx
  })

  if(req.body.subscribe_workflow) {
    await createWorkflow(req, {
      topic,
      title: 'Subscribe Workflow',
      action: 'add',
      program_id: req.params.program_id
    })
  }

  if(req.body.unsubscribe_workflow) {
    await createWorkflow(req, {
      topic,
      title: 'Unsubscribe Workflow',
      action: 'remove',
      program_id: req.params.program_id
    })
  }

  await audit(req, {
    story: 'created',
    auditable: topic
  })

  await activity(req, {
    story: 'created {object}',
    object: topic
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${req.params.program_id}`
  ])

  res.status(200).respond(topic, TopicSerializer)

}

export default createRoute
