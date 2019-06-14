import { listeners } from '../../../../../core/services/routes/listeners'
import { activity } from '../../../../../core/services/routes/activities'
import ReimbursementSerializer from '../../../serializers/reimbursement_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import { createReceipts } from '../../../services/receipts'
import Reimbursement from '../../../models/reimbursement'
import { completeItem } from '../../../services/items'
import Member from '../../../models/member'

const updateRoute = async (req, res) => {

  const reimbursement = await Reimbursement.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['user','project.members','expense_type','status','vendor'],
    transacting: req.trx
  })

  if(!reimbursement) return req.status(404).respond({
    code: 404,
    message: 'Unable to load expense'
  })

  await reimbursement.save(whitelist(req.body, ['date','project_id','expense_type_id','vendor_id','description','amount']), {
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
    story: 'updated',
    auditable: reimbursement
  })

  await socket.refresh(req, [{
    channel: 'user',
    target: '/admin/expenses/items'
  }, {
    channel: 'team',
    target: [
      `/admin/expenses/reimbursements/${reimbursement.get('id')}`,
      '/admin/expenses/approvals',
      '/admin/expenses/reports'
    ]
  }])

  res.status(200).respond(reimbursement, (reimbursement) => {
    return ReimbursementSerializer(req, reimbursement)
  })

}

export default updateRoute
