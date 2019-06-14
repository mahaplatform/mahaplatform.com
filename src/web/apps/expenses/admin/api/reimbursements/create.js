import ReimbursementSerializer from '../../../serializers/reimbursement_serializer'
import { listeners } from '../../../../../core/services/routes/listeners'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import { createReceipts } from '../../../services/receipts'
import Reimbursement from '../../../models/reimbursement'
import { completeItem } from '../../../services/items'
import Member from '../../../models/member'

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

  const members = await Member.query(qb => {
    qb.where('project_id', reimbursement.get('project_id'))
    qb.whereRaw('(member_type_id != ? OR user_id = ?)', [3, req.user.get('id')])
  }).fetchAll({
    transacting: req.trx
  })

  await listeners(req, members.map(member => ({
    listenable: reimbursement,
    user_id: member.get('user_id')
  })))

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
