import DatasetSerializer from '@apps/datasets/serializers/dataset_serializer'
import Dataset from '@apps/datasets/models/dataset'

const showRoute = async (req, res) => {

  const dataset = await Dataset.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!dataset) return res.status(404).respond({
    code: 404,
    message: 'Unable to load dataset'
  })

  await res.status(200).respond(dataset, DatasetSerializer)

}

export default showRoute
