import APIKeySerializer from '@apps/datasets/serializers/apikey_serializer'
import Dataset from '@apps/datasets/models/dataset'
import APIKey from '@apps/datasets/models/apikey'

const listRoute = async (req, res) => {

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

  const apikeys = await APIKey.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('dataset_id', dataset.get('id'))
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

  res.status(200).respond(apikeys, APIKeySerializer)

}

export default listRoute
