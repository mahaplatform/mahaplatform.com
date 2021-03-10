import { activity } from '@core/services/routes/activities'
import ExpenseTypeSerializer from '@apps/finance/serializers/expense_type_serializer'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import ExpenseType from '@apps/finance/models/expense_type'

const createRoute = async (req, res) => {

  const expense_type = await ExpenseType.forge({
    is_active: true,
    ...whitelist(req.body, ['title','description','integration'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: expense_type
  })

  await socket.refresh(req, [
    '/admin/finance/expense_types'
  ])

  await res.status(200).respond(expense_type, ExpenseTypeSerializer)

}

export default createRoute
