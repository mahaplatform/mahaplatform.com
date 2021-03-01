import DatasetSerializer from '@apps/datasets/serializers/dataset_serializer'
import Dataset from '@apps/datasets/models/dataset'

const listRoute = async (req, res) => {

  const datasets = await Dataset.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.whereNull('deleted_at')
    },
    filter: {
      params: req.query.$filter
    },
    sort: {
      params: req.query.$sort,
      default: 'title'
    },
    withRelated: ['types'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(datasets, DatasetSerializer)

}

export default listRoute
