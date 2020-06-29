import AllocationSerializer from '../../../serializers/allocation_serializer'
import Allocation from '../../../models/allocation'

const allocationsRoute = async (req, res) => {

  const allocations = await Allocation.query(qb => {
    qb.select(req.trx.raw('finance_allocations.*,finance_allocation_details.*'))
    qb.innerJoin('finance_allocation_details','finance_allocation_details.allocation_id','finance_allocations.id')
    qb.where('finance_allocations.team_id', req.team.get('id'))
    qb.where('finance_allocations.payment_id', req.params.payment_id)
  }).fetchAll({
    withRelated: ['line_item'],
    transacting: req.trx
  })

  res.status(200).respond(allocations, AllocationSerializer)

}

export default allocationsRoute
