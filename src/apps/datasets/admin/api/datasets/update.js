import DatasetSerializer from '@apps/datasets/serializers/dataset_serializer'
import { activity } from '@core/services/routes/activities'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Dataset from '@apps/datasets/models/dataset'

const updateRoute = async (req, res) => {

  const dataset = await Dataset.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!dataset) return res.status(404).respond({
    code: 404,
    message: 'Unable to load dataset'
  })

  await dataset.save({
    title: req.body.title
  },{
    transacting: req.trx,
    patch: true
  })

  await audit(req, {
    story: 'updated',
    auditable: dataset
  })

  await activity(req, {
    story: 'updated {object}',
    object: dataset
  })

  await socket.refresh(req, [
    '/admin/datasets/datasets'
  ])

  res.status(200).respond(dataset, DatasetSerializer)

}

export default updateRoute
