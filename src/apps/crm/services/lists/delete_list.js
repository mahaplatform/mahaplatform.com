import { deleteWorkflow } from '@apps/automation/services/workflows'
import { audit } from '@core/services/routes/audit'
import moment from 'moment'

const deleteList = async (req, { list }) => {

  await list.load(['workflows'], {
    transacting: req.trx
  })

  await req.trx('crm_subscriptions').where('list_id', list.get('id')).del()

  await req.trx('automation_steps').where(qb => {
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

  if(list.related('workflows').length > 0) {
    await Promise.mapSeries(list.related('workflows'), async (workflow) => {
      await deleteWorkflow(req, {
        workflow
      })
    })
  }

  await audit(req, {
    story: 'deleted',
    auditable: list
  })

}

export default deleteList
