import { deleteWorkflow } from '@apps/automation/services/workflows'
import { audit } from '@core/services/routes/audit'
import moment from 'moment'

const deleteTopic = async (req, { topic }) => {

  await topic.load(['workflows'], {
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

  if(topic.related('workflows').length > 0) {
    await Promise.mapSeries(topic.related('workflows'), async (workflow) => {
      await deleteWorkflow(req, {
        workflow
      })
    })
  }
  
  await audit(req, {
    story: 'deleted',
    auditable: topic
  })

}

export default deleteTopic
