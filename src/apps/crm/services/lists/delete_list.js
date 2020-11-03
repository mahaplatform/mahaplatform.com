import { deleteWorkflow } from '../../../automation/services/workflows'
import { audit } from '../../../../core/services/routes/audit'
import moment from 'moment'

const deleteList = async (req, { list }) => {

  await list.load(['subscribe_workflow','unsubscribe_workflow'], {
    transacting: req.trx
  })

  await req.trx('crm_subscriptions').where('list_id', list.get('id')).del()

  await req.trx('crm_workflow_steps').where(qb => {
    qb.where('action', 'list')
    qb.whereRaw('(config->\'list_id\')::int=?', list.get('id'))
  }).update({
    is_active: false
  })

  await list.save({
    deleted_at: moment()
  },{
    transacting: req.trx,
    patch: true
  })

  if(list.related('subscribe_workflow').get('id')) {
    await deleteWorkflow(req, {
      workflow: list.related('subscribe_workflow')
    })
  }

  if(list.related('unsubscribe_workflow').get('id')) {
    await deleteWorkflow(req, {
      workflow: list.related('unsubscribe_workflow')
    })
  }

  await audit(req, {
    story: 'deleted',
    auditable: list
  })

}

export default deleteList
