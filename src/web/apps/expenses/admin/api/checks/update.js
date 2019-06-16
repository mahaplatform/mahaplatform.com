import { listeners } from '../../../../../core/services/routes/listeners'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import CheckSerializer from '../../../serializers/check_serializer'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import { createReceipts } from '../../../services/receipts'
import { completeItem } from '../../../services/items'
import Member from '../../../models/member'
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
