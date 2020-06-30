import AllocationSerializer from '../../../serializers/allocation_serializer'
import Allocation from '../../../models/allocation'

const allocationsRoute = async (req, res) => {

  const allocations = await Allocation.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('payment_id', req.params.payment_id)
  }).fetchAll({
    withRelated: ['line_item'],
    transacting: req.trx
  })

  res.status(200).respond(allocations, AllocationSerializer)

}

export default allocationsRoute
