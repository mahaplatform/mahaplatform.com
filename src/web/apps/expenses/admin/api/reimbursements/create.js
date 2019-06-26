import ReimbursementSerializer from '../../../serializers/reimbursement_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import { createReceipts } from '../../../services/receipts'
import Reimbursement from '../../../models/reimbursement'
import { completeItem } from '../../../services/items'

const createRoute = async (req, res) => {

  const reimbursement = await Reimbursement.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    status_id: 1,
    ...whitelist(req.body, ['date','project_id','expense_type_id','vendor_id','description','amount'])
  }).save(null, {
    transacting: req.trx
  })

  await createReceipts(req, {
    type: 'reimbursement',
    item: reimbursement
  })

  await completeItem(req, {
    item: reimbursement,
    required: ['date','receipt_ids','description','amount','project_id','expense_type_id','vendor_id']
  })

  await activity(req, {
    story: 'created {object}',
    object: reimbursement
  })

  await audit(req, {
    story: 'created',
    auditable: reimbursement
  })

  await socket.refresh(req, [{
    channel: `/admin/users/${req.user.get('id')}`,
    target: '/admin/expenses/items'
  }, {
    channel: 'team',
    target: [
      `/admin/expenses/reimbursements/${reimbursement.get('id')}`,
      '/admin/expenses/approvals',
      '/admin/expenses/reports'
    ]
  }])

  res.status(200).respond(reimbursement, ReimbursementSerializer)

}

export default createRoute
