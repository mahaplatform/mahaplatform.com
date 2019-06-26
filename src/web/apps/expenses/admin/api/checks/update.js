import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import CheckSerializer from '../../../serializers/check_serializer'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import { createReceipts } from '../../../services/receipts'
import { completeItem } from '../../../services/items'
import Check from '../../../models/check'

const updateRoute = async (req, res) => {

  const check = await Check.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts.asset','receipts.asset.source','user','project.members','expense_type','status','vendor'],
    transacting: req.trx
  })

  if(!check) return res.status(404).respond({
    code: 404,
    message: 'Unable to load check'
  })

  await check.save(whitelist(req.body, ['project_id','expense_type_id','vendor_id','delivery_method','date_needed','description','amount','description']), {
    transacting: req.trx
  })

  await createReceipts(req, {
    type: 'check',
    item: check
  })

  await completeItem(req, {
    item: check,
    required: ['date_needed','description','amount','project_id','expense_type_id','vendor_id','delivery_method']
  })

  await activity(req, {
    story: 'updated {object}',
    object: check
  })

  await audit(req, {
    story: 'updated',
    auditable: check
  })

  await socket.refresh(req, [{
    channel: 'user',
    target: '/admin/expenses/items'
  }, {
    channel: 'team',
    target: [
      `/admin/expenses/checks/${check.get('id')}`,
      '/admin/expenses/approvals',
      '/admin/expenses/reports'
    ]
  }])

  res.status(200).respond(check, CheckSerializer)

}

export default updateRoute
