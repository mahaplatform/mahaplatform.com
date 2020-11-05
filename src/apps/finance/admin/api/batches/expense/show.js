import AccpacExpenseSerializer from '@apps/finance/serializers/accpac_expense_serializer'
import ExpenseType from '@apps/finance/models/expense_type'
import Batch from '@apps/finance/models/batch'
import Item from '@apps/finance/models/item'

const showRoute = async (req, res) => {

  const batch = await Batch.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('type', 'expense')
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!batch) return res.status(404).respond({
    code: 404,
    message: 'Unable to load batch'
  })

  req.tax_expense_type = await ExpenseType.query(qb => {
    qb.where('id', 49)
  }).fetch({
    transacting: req.trx
  })

  const items = await Item.query(qb => {
    qb.where('batch_id', req.params.id)
  }).fetchAll({
    withRelated: ['expense_type','project','tax_project','user','vendor','account'],
    transacting: req.trx
  })

  res.status(200).respond({ batch, items }, AccpacExpenseSerializer)

}

export default showRoute
