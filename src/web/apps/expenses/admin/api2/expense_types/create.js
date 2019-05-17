import { activity } from '../../../../../core/services/routes/activities'
import ExpenseTypeSerializer from '../../../serializers/expense_type_serializer'
import socket from '../../../../../core/services/routes/emitter'
import ExpenseType from '../../../models/expense_type'
import _ from 'lodash'

const createRoute = async (req, res) => {

  const allowed = _.pick(req.body, ['title','description','integration','is_active'])

  const data = _.omitBy(allowed, _.isNil)

  const expense_type = await ExpenseType.forge({
    team_id: req.team.get('id'),
    is_active: true,
    ...data
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

  res.status(200).respond(expense_type, (expense_type) => {
    return ExpenseTypeSerializer(req, req.trx, expense_type)
  })

}

export default createRoute
