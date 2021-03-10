import { activity } from '@core/services/routes/activities'
import { audit } from '@core/services/routes/audit'
import Dataset from '@apps/datasets/models/dataset'
import socket from '@core/services/routes/emitter'
import moment from 'moment'

const destroyRoute = async (req, res) => {

  const dataset = await Dataset.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['types'],
    transacting: req.trx
  })

  if(!dataset) return res.status(404).respond({
    code: 404,
    message: 'Unable to load dataset'
  })

  await Promise.mapSeries(dataset.related('types'), async (type) => {
    await type.save({
      deleted_at: moment()
    }, {
      transacting: req.trx,
      patch: true
    })
  })

  await dataset.save({
    deleted_at: moment()
  }, {
    transacting: req.trx,
    patch: true
  })

  await audit(req, {
    story: 'deleted',
    auditable: dataset
  })

  await activity(req, {
    story: 'deleted {object}',
    object: dataset
  })

  await socket.refresh(req, [
    '/admin/datasets/datasets'
  ])

  await res.status(200).respond(true)

}

export default destroyRoute
