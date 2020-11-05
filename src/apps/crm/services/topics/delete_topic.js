import { deleteWorkflow } from '@apps/automation/services/workflows'
import { audit } from '@core/services/routes/audit'
import moment from 'moment'

const deleteTopic = async (req, { topic }) => {

  await topic.load(['subscribe_workflow','unsubscribe_workflow'], {
    transacting: req.trx
  })

  await req.trx('crm_interests').where('topic_id', topic.get('id')).del()

  await req.trx('crm_workflow_steps').where(qb => {
    qb.where('action', 'topic')
    qb.whereRaw('(config->\'topic_id\')::int=?', topic.get('id'))
  }).update({
    is_active: false
  })

  await topic.save({
    deleted_at: moment()
  },{
    transacting: req.trx,
    patch: true
  })

  if(topic.related('subscribe_workflow').get('id')) {
    await deleteWorkflow(req, {
      workflow: topic.related('subscribe_workflow')
    })
  }

  if(topic.related('unsubscribe_workflow').get('id')) {
    await deleteWorkflow(req, {
      workflow: topic.related('unsubscribe_workflow')
    })
  }

  await audit(req, {
    story: 'deleted',
    auditable: topic
  })

}

export default deleteTopic
