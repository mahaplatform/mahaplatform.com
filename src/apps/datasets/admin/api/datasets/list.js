import DatasetSerializer from '@apps/datasets/serializers/dataset_serializer'
import Dataset from '@apps/datasets/models/dataset'

const listRoute = async (req, res) => {

  const datasets = await Dataset.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.params.$filter
    },
    sort: {
      params: req.params.$sort
    },
    withRelated: ['types'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(datasets, DatasetSerializer)

}

export default listRoute
