import APIKeySerializer from '@apps/datasets/serializers/apikey_serializer'
import Dataset from '@apps/datasets/models/dataset'
import APIKey from '@apps/datasets/models/apikey'

const destroyRoute = async (req, res) => {

  const dataset = await Dataset.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.dataset_id)
  }).fetch({
    transacting: req.trx
  })

  if(!dataset) return res.status(404).respond({
    code: 404,
    message: 'Unable to load dataset'
  })

  const apikey = await APIKey.query(qb => {
    qb.where('dataset_id', dataset.get('id'))
  }).fetch({
    transacting: req.trx
  })

  if(!apikey) return res.status(404).respond({
    code: 404,
    message: 'Unable to load apikey'
  })

  await apikey.destroy({
    transacting: req.trx
  })

  await res.status(200).respond(true)

}

export default destroyRoute
