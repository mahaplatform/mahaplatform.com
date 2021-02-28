import APIKeySerializer from '@apps/datasets/serializers/apikey_serializer'
import { activity } from '@core/services/routes/activities'
import generateCode from '@core/utils/generate_code'
import socket from '@core/services/routes/emitter'
import Dataset from '@apps/datasets/models/dataset'
import APIKey from '@apps/datasets/models/apikey'

const createRoute = async (req, res) => {

  const dataset = await Dataset.query(qb => {
    qb.where('id', req.params.dataset_id)
  }).fetch({
    transacting: req.trx
  })

  if(!dataset) return res.status(404).respond({
    code: 404,
    message: 'Unable to load dataset'
  })

  const access_token = await generateCode(req, {
    table: 'datasets_apikeys',
    key: 'access_token',
    length: 16
  })

  const apikey = await APIKey.forge({
    team_id: req.team.get('id'),
    dataset_id: dataset.get('id'),
    title: req.body.title,
    description: req.body.description,
    access_token
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: apikey
  })

  await socket.refresh(req, [
    `/admin/datasets/datasets/${apikey.get('id')}/apikey`
  ])

  res.status(200).respond(apikey, APIKeySerializer)

}

export default createRoute
