import DatasetAccessSerializer from '@apps/datasets/serializers/dataset_access_serializer'
import DatasetAccess from '@apps/datasets/models/dataset_access'

const listRoute = async (req, res) => {

  const accesses = await DatasetAccess.filterFetch({
    scope: (qb) => {
      qb.where('datasets_dataset_accesses.team_id', req.team.get('id'))
      qb.where('datasets_dataset_accesses.dataset_id', req.params.dataset_id)
    },
    page: req.query.$page,
    withRelated: ['user.photo','group','grouping'],
    transacting: req.trx
  })

  res.status(200).respond(accesses, DatasetAccessSerializer)

}

export default listRoute
