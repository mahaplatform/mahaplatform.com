import AllocationSerializer from '@apps/finance/serializers/allocation_serializer'
import Allocation from '@apps/finance/models/allocation'

const allocationsRoute = async (req, res) => {

  const allocations = await Allocation.query(qb => {
    qb.innerJoin('finance_line_items','finance_line_items.id','finance_allocations.line_item_id')
    qb.where('finance_allocations.team_id', req.team.get('id'))
    qb.where('finance_allocations.refund_id', req.params.refund_id)
    qb.orderBy('finance_line_items.delta','asc')
  }).fetchAll({
    withRelated: ['line_item'],
    transacting: req.trx
  })

  res.status(200).respond(allocations, AllocationSerializer)

}

export default allocationsRoute
