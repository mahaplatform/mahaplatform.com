import CheckSerializer from '../../../serializers/check_serializer'
import { createCheck } from '../../../services/checks'
import generateCode from '../../../../../core/utils/generate_code'
import socket from '../../../../../core/services/routes/emitter'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'finance_checks'
  })

  const allocations = req.body.allocations || [[]]

  const checks = await Promise.mapSeries(allocations, async(allocation) => {

    return await createCheck(req, {
      user_id: req.user.get('id'),
      status: 'incomplete',
      code,
      ...req.body,
      ...allocation
    })

  })

  await socket.refresh(req, [
    `/admin/users/${req.user.get('id')}`,
    '/admin/finance/approvals',
    '/admin/finance/reports',
    {
      channel: 'user',
      target: '/admin/finance/items'
    }
  ])

  res.status(200).respond(checks, CheckSerializer)

}

export default createRoute
