import Batch from '../../../models/batch'
import Item from '../../../models/item'
import accpaccSerializer from '../../../serializers/accpac_serializer'
import { Route } from 'maha'

const processor = async (req, trx, options) => {

  const batch = await Batch.where({ id: req.params.id }).fetch({ transacting: trx })

  const items = await Item.where({ batch_id: req.params.id }).fetchAll({ withRelated: ['expense_type','project','user','vendor','account'], transacting: trx })

  return accpaccSerializer(req, trx, { batch, items })

}

const showRoute = new Route({
  method: 'get',
  path: '/:id',
  processor,
  rights: ['expenses:access_reports']
})

export default showRoute
