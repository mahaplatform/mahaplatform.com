import ItemSerializer from '@apps/datasets/serializers/item_serializer'
import Dataset from '@apps/datasets/models/dataset'
import Type from '@apps/datasets/models/type'
import Item from '@apps/datasets/models/item'

const showRoute = async (req, res) => {

  const dataset = await Dataset.query(qb => {
    qb.where('code', req.params.dataset_code)
  }).fetch({
    transacting: req.trx
  })

  if(!dataset) return res.status(404).respond({
    code: 404,
    message: 'Unable to load dataset'
  })

  const type = await Type.query(qb => {
    qb.where('dataset_id', dataset.get('id'))
    qb.where('code', req.params.type_code)
  }).fetch({
    transacting: req.trx
  })

  if(!type) return res.status(404).respond({
    code: 404,
    message: 'Unable to load type'
  })

  const item = await Item.query(qb => {
    qb.where('type_id', type.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!item) return res.status(404).respond({
    code: 404,
    message: 'Unable to load item'
  })

  res.status(200).respond(item, ItemSerializer)

}
export default showRoute
