import DatasetSerializer from '@apps/datasets/serializers/dataset_serializer'
import { activity } from '@core/services/routes/activities'
import generateCode from '@core/utils/generate_code'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Dataset from '@apps/datasets/models/dataset'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'datasets_datasets'
  })

  const dataset = await Dataset.forge({
    team_id: req.team.get('id'),
    code,
    title: req.body.title
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: dataset
  })

  await activity(req, {
    story: 'created {object}',
    object: dataset
  })

  await socket.refresh(req, [
    '/admin/datasets/datasets'
  ])

  res.status(200).respond(dataset, DatasetSerializer)

}

export default createRoute
