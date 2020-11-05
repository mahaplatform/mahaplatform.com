import ExpenseTypeSerializer from '@apps/finance/serializers/expense_type_serializer'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import ExpenseType from '@apps/finance/models/expense_type'

const updateRoute = async (req, res) => {

  const expense_type = await ExpenseType.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!expense_type) return res.status(404).respond({
    code: 404,
    message: 'Unable to load expense type'
  })

  await expense_type.save(whitelist(req.body, ['title','description','integration']), {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: expense_type
  })

  await socket.refresh(req, [
    '/admin/finance/expense_types'
  ])

  res.status(200).respond(expense_type, ExpenseTypeSerializer)

}

export default updateRoute
