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
    page: req.query.$page,
    transacting: req.trx
  })

  const data = [
    { id: 1, title: 'Dataset 1', types: [
      { id: 1, title: 'Type 1a' },
      { id: 2, title: 'Type 1b' },
      { id: 3, title: 'Type 1c' },
      { id: 4, title: 'Type 1d' }
    ] },
    { id: 2, title: 'Dataset 2', types: [
      { id: 5, title: 'Type 2a' },
      { id: 6, title: 'Type 2b' }
    ] },
    { id: 3, title: 'Dataset 3', types: [] }
  ]

  res.status(200).respond(data)
  // res.status(200).respond(datasets, DatasetSerializer)

}

export default listRoute
