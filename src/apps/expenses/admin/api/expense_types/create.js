import { activity } from '../../../../../web/core/services/routes/activities'
import ExpenseTypeSerializer from '../../../serializers/expense_type_serializer'
import { whitelist } from '../../../../../web/core/services/routes/params'
import socket from '../../../../../web/core/services/routes/emitter'
import ExpenseType from '../../../models/expense_type'

const createRoute = async (req, res) => {

  const expense_type = await ExpenseType.forge({
    team_id: req.team.get('id'),
    is_active: true,
    ...whitelist(req.body, ['title','description','integration','is_active'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: expense_type
  })

  await socket.refresh(req, [
    '/admin/expenses/expense_types'
  ])

  res.status(200).respond(expense_type, ExpenseTypeSerializer)

}

export default createRoute
