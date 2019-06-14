import { listeners } from '../../../../../core/services/routes/listeners'
import { activity } from '../../../../../core/services/routes/activities'
import CheckSerializer from '../../../serializers/check_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import { createReceipts } from '../../../services/receipts'
import { completeItem } from '../../../services/items'
import Member from '../../../models/member'
import Check from '../../../models/check'

const createRoute = async (req, res) => {

  const check = await Check.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    status_id: 1,
    ...whitelist(req.body, ['project_id','expense_type_id','vendor_id','delivery_method','date_needed','description','amount','description'])
  }).save(null, {
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

  const members = await Member.query(qb => {
    qb.where('project_id', check.get('project_id'))
    qb.whereRaw('(member_type_id != ? OR user_id = ?)', [3, req.user.get('id')])
  }).fetchAll({
    transacting: req.trx
  })

  await listeners(req, members.map(member => ({
    listenable: check,
    user_id: member.get('user_id')
  })))

  await activity(req, {
    story: 'created {object}',
    object: check
  })

  await audit(req, {
    story: 'created',
    auditable: check
  })

  await socket.refresh(req, [{
    channel: `/admin/users/${req.user.get('id')}`,
    target: '/admin/expenses/items'
  }, {
    channel: 'team',
    target: [
      `/admin/expenses/checks/${check.get('id')}`,
      '/admin/expenses/approvals',
      '/admin/expenses/reports'
    ]
  }])

  res.status(200).respond(check, (check) => {
    return CheckSerializer(req, req.trx, check)
  })

}

export default createRoute
