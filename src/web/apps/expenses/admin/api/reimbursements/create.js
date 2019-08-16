import ReimbursementSerializer from '../../../serializers/reimbursement_serializer'
import { createReimbursement } from '../../../services/reimbursements'
import generateCode from '../../../../../core/utils/generate_code'
import socket from '../../../../../core/services/routes/emitter'

const createRoute = async (req, res) => {
  
  const code = await generateCode(req, {
    table: 'expenses_reimbursements'
  })

  const line_items = req.body.line_items || [[]]

  const reimbursements = await Promise.mapSeries(line_items, async(line_item) => {

    return await createReimbursement(req, {
      user_id: req.user.get('id'),
      status_id: 1,
      code,
      ...req.body,
      ...line_item
    })

  })

  await socket.refresh(req, [
    '/admin/expenses/approvals',
    '/admin/expenses/reports',
    {
      channel: 'user',
      target: '/admin/expenses/items'
    }
  ])

  res.status(200).respond(reimbursements, ReimbursementSerializer)

}

export default createRoute
