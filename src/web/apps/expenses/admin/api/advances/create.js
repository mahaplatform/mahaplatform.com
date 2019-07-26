import { activity } from '../../../../../core/services/routes/activities'
import AdvanceSerializer from '../../../serializers/advance_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import { completeItem } from '../../../services/items'
import Advance from '../../../models/advance'

const createRoute = async (req, res) => {

  const advance = await Advance.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    status_id: 1,
    ...whitelist(req.body, ['project_id','expense_type_id','date_needed','description','amount','description'])
  }).save(null, {
    transacting: req.trx
  })

  await completeItem(req, {
    item: advance,
    required: ['date_needed','description','amount','project_id','expense_type_id']
  })

  await activity(req, {
    story: 'created {object}',
    object: advance
  })

  await audit(req, {
    story: 'created',
    auditable: advance
  })

  await socket.refresh(req, [
    `/admin/expenses/advances/${advance.get('id')}`,
    '/admin/expenses/approvals',
    '/admin/expenses/reports',
    {
      channel: 'user',
      target: '/admin/expenses/items'
    }
  ])

  res.status(200).respond(advance, AdvanceSerializer)

}

export default createRoute
