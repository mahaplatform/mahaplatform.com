import DatasetSerializer from '@apps/datasets/serializers/dataset_serializer'
import DatasetAccess from '@apps/datasets/models/dataset_access'
import { activity } from '@core/services/routes/activities'
import generateCode from '@core/utils/generate_code'
import { audit } from '@core/services/routes/audit'
import Dataset from '@apps/datasets/models/dataset'
import socket from '@core/services/routes/emitter'

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

  await DatasetAccess.forge({
    team_id: req.team.get('id'),
    dataset_id: dataset.get('id'),
    user_id: req.user.get('id'),
    type: 'manage'
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
