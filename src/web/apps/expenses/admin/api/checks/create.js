import CheckSerializer from '../../../serializers/check_serializer'
import { createCheck } from '../../../services/checks'
import generateCode from '../../../../../core/utils/generate_code'
import socket from '../../../../../core/services/routes/emitter'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'expenses_checks'
  })

  const line_items = req.body.line_items || [[]]

  const checks = await Promise.mapSeries(line_items, async(line_item) => {

    return await createCheck(req, {
      user_id: req.user.get('id'),
      status_id: 1,
      code,
      ...req.body,
      ...line_item
    })

  })

  await socket.refresh(req, [
    `/admin/users/${req.user.get('id')}`,
    '/admin/expenses/approvals',
    '/admin/expenses/reports',
    {
      channel: 'user',
      target: '/admin/expenses/items'
    }
  ])

  res.status(200).respond(checks, CheckSerializer)

}

export default createRoute
