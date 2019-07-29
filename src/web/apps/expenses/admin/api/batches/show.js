import Batch from '../../../models/batch'
import Item from '../../../models/item'
import AccpaccSerializer from '../../../serializers/accpac_serializer'

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

  const data = await AccpaccSerializer(req, { batch, items })

  res.status(200).respond(data)

}

export default showRoute
