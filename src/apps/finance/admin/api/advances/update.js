import { activity } from '../../../../../core/services/routes/activities'
import AdvanceSerializer from '../../../serializers/advance_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import { completeItem } from '../../../services/items'
import Advance from '../../../models/advance'

const updateRoute = async (req, res) => {

  const advance = await Advance.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: [      'user','project.members','expense_type','status'],
    transacting: req.trx
  })

  if(!advance) return res.status(404).respond({
    code: 404,
    message: 'Unable to load advance'
  })

  await advance.save({
    ...whitelist(req.body, ['project_id','expense_type_id','date_needed','description','amount','description']),
    status: advance.get('status') === 'rejected' ? 'pending' : advance.get('status')    
  }, {
    patch: true,
    transacting: req.trx
  })

  await completeItem(req, {
    item: advance,
    required: ['date_needed','description','amount','project_id','expense_type_id']
  })

  await activity(req, {
    story: 'updated {object}',
    object: advance
  })

  await audit(req, {
    story: 'updated',
    auditable: advance
  })

  await socket.refresh(req, [
    `/admin/finance/advances/${advance.get('id')}`,
    '/admin/finance/approvals',
    '/admin/finance/reports',
    {
      channel: 'user',
      target: '/admin/finance/items'
    }
  ])

  res.status(200).respond(advance, AdvanceSerializer)

}

export default updateRoute
