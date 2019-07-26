import ReimbursementSerializer from '../../../serializers/reimbursement_serializer'
import { createReimbursement } from '../../../services/reimbursements'
import generateCode from '../../../../../core/utils/generate_code'
import socket from '../../../../../core/services/routes/emitter'

const createRoute = async (req, res) => {

  const code = generateCode()

  const reimbursements = await Promise.mapSeries(req.body.line_items, async(line_item) => {

    return await createReimbursement(req, {
      user_id: req.user.get('id'),
      status_id: 1,
      code,
      ...req.body,
      ...line_item
    })

  })

  await socket.refresh(req, [{
    channel: `/admin/users/${req.user.get('id')}`,
    target: '/admin/expenses/items'
  }, {
    channel: 'team',
    target: [
      '/admin/expenses/approvals',
      '/admin/expenses/reports'
    ]
  }])

  res.status(200).respond(reimbursements, ReimbursementSerializer)

}

export default createRoute
