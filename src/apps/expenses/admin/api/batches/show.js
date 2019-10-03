import AccpaccSerializer from '../../../serializers/accpac_serializer'
import ExpenseType from '../../../models/expense_type'
import Batch from '../../../models/batch'
import Item from '../../../models/item'

const showRoute = async (req, res) => {

  const batch = await Batch.where({
    id: req.params.id
  }).fetch({
    transacting: req.trx
  })

  const items = await Item.where({
    batch_id: req.params.id
  }).fetchAll({
    withRelated: ['expense_type','project','tax_project','user','vendor','account'],
    transacting: req.trx
  })

  req.tax_expense_type = await ExpenseType.where({
    id: req.apps.expenses.settings.tax_expense_type_id
  }).fetch({
    transacting: req.trx
  })

  const data = await AccpaccSerializer(req, { batch, items })

  res.status(200).respond(data)

}

export default showRoute
