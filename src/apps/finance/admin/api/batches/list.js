import BatchSerializer from '@apps/finance/serializers/batch_serializer'
import Batch from '@apps/finance/models/batch'

const listRoute = async (req, res) => {

  const batches = await Batch.filterFetch({
    scope: (qb) => {
      qb.select(req.trx.raw('finance_batches.*,finance_batch_totals.*'))
      qb.innerJoin('finance_batch_totals','finance_batch_totals.batch_id','finance_batches.id')
      qb.innerJoin('maha_users','maha_users.id','finance_batches.user_id')
      qb.where('finance_batches.team_id', req.team.get('id'))
    },
    aliases: {
      user: 'maha_users.last_name',
      items_count: 'finance_batch_totals.items_count',
      total: 'finance_batch_totals.total'
    },
    filter: {
      params: req.query.$filter
    },
    sort: {
      params: req.query.$sort,
      defaults: ['-date'],
      allowed: ['maha_users.last_name','items_count','total','date','created_at']
    },
    page: req.query.$page,
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  await res.status(200).respond(batches, BatchSerializer)

}

export default listRoute
