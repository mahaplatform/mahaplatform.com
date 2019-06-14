import { listeners } from '../../../../../core/services/routes/listeners'
import { activity } from '../../../../../core/services/routes/activities'
import AdvanceSerializer from '../../../serializers/advance_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import { completeItem } from '../../../services/items'
import Advance from '../../../models/advance'
import Member from '../../../models/member'

const updateRoute = async (req, res) => {

  const advance = await Advance.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['user','project.members','expense_type','status','vendor'],
    transacting: req.trx
  })

  if(!advance) return req.status(404).respond({
    code: 404,
    message: 'Unable to load advance'
  })

  await advance.save(whitelist(req.body, ['project_id','expense_type_id','date_needed','description','amount','description']), {
    transacting: req.trx
  })

  await completeItem(req, {
    item: advance,
    required: ['date_needed','description','amount','project_id','expense_type_id']
  })

  const members = await Member.query(qb => {
    qb.where('project_id', advance.get('project_id'))
    qb.whereRaw('(member_type_id != ? OR user_id = ?)', [3, req.user.get('id')])
  }).fetchAll({
    transacting: req.trx
  })

  await listeners(req, members.map(member => ({
    listenable: advance,
    user_id: member.get('user_id')
  })))

  await activity(req, {
    story: 'updated {object}',
    object: advance
  })

  await audit(req, {
    story: 'updated',
    auditable: advance
  })

  await socket.refresh(req, [{
    channel: 'user',
    target: '/admin/expenses/items'
  }, {
    channel: 'team',
    target: [
      `/admin/expenses/advances/${advance.get('id')}`,
      '/admin/expenses/approvals',
      '/admin/expenses/reports'
    ]
  }])

  res.status(200).respond(advance, AdvanceSerializer)

}

export default updateRoute
