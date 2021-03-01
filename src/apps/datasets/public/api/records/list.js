import ItemSerializer from '@apps/datasets/serializers/record_serializer'
import Dataset from '@apps/datasets/models/dataset'
import Type from '@apps/datasets/models/type'
import Item from '@apps/datasets/models/record'

const listRoute = async (req, res) => {

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

  const records = await Item.filterFetch({
    scope: (qb) => {
      qb.where('type_id', type.get('id'))
    },
    filter: {
      params: req.query.$filter
    },
    sort: {
      params: req.query.$sort
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(records, ItemSerializer)

}

export default listRoute
