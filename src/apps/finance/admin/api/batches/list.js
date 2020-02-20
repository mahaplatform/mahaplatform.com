import BatchSerializer from '../../../serializers/batch_serializer'
import Batch from '../../../models/batch'

const listRoute = async (req, res) => {

  const batches = await Batch.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter
    },
    sort: {
      params: req.query.$sort,
      defaults: ['-created_at'],
      allowed: ['maha_users.last_name','items_count','total','created_at']
    },
    page: req.query.$page,
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(batches, BatchSerializer)

}

export default listRoute
