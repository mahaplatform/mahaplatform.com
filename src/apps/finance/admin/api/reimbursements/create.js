import ReimbursementSerializer from '@apps/finance/serializers/reimbursement_serializer'
import { createReimbursement } from '@apps/finance/services/reimbursements'
import generateCode from '@core/utils/generate_code'
import socket from '@core/services/routes/emitter'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'finance_items'
  })

  const allocations = req.body.allocations || [[]]

  const reimbursements = await Promise.mapSeries(allocations, async(allocation) => {

    return await createReimbursement(req, {
      user_id: req.user.get('id'),
      status: 'incomplete',
      code,
      ...req.body,
      ...allocation
    })

  })

  await socket.refresh(req, [
    '/admin/finance/approvals',
    '/admin/finance/reports',
    {
      channel: 'user',
      target: '/admin/finance/items'
    }
  ])

  await res.status(200).respond(reimbursements, ReimbursementSerializer)

}

export default createRoute
