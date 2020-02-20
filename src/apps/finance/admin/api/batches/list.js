import BatchSerializer from '../../../serializers/batch_serializer'
import Batch from '../../../models/batch'

const listRoute = async (req, res) => {

  const batches = await Batch.filter({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: req.query.$filter,
    sort: req.query.$sort,
    defaultSort: ['-created_at'],
    sortParams: ['maha_users.last_name','items_count','total','created_at']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(batches, BatchSerializer)

}

export default listRoute
