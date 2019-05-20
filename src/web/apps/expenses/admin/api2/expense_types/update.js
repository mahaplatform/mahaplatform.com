import { activity } from '../../../../../core/services/routes/activities'
import ExpenseTypeSerializer from '../../../serializers/expense_type_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import ExpenseType from '../../../models/expense_type'
import _ from 'lodash'

const updateRoute = async (req, res) => {

  const expense_type = await ExpenseType.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!expense_type) return req.status(404).respond({
    code: 404,
    message: 'Unable to load expense type'
  })

  await expense_type.save(whitelist(req.body, ['title','description','integration','is_active']), {
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: expense_type
  })

  await socket.refresh(req, [
    '/admin/expenses/expense_types'
  ])

  res.status(200).respond(expense_type, (expense_type) => {
    return ExpenseTypeSerializer(req, req.trx, expense_type)
  })

}

export default updateRoute
