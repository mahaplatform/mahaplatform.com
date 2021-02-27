import RecordSerializer from '@apps/datasets/serializers/record_serializer'
import Dataset from '@apps/datasets/models/dataset'
import Record from '@apps/datasets/models/record'
import Type from '@apps/datasets/models/type'

const showRoute = async (req, res) => {

  const dataset = await Dataset.query(qb => {
    qb.where('id', req.params.dataset_id)
  }).fetch({
    transacting: req.trx
  })

  if(!dataset) return res.status(404).respond({
    code: 404,
    message: 'Unable to load dataset'
  })

  const type = await Type.query(qb => {
    qb.where('dataset_id', dataset.get('id'))
    qb.where('id', req.params.type_id)
  }).fetch({
    transacting: req.trx
  })

  if(!type) return res.status(404).respond({
    code: 404,
    message: 'Unable to load type'
  })

  const record = await Record.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!record) return res.status(404).respond({
    code: 404,
    message: 'Unable to load record'
  })

  res.status(200).respond(record, RecordSerializer)

}

export default showRoute
