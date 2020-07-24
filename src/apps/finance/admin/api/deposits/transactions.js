import DepositLineItemSerializer from '../../../serializers/deposit_line_item_serializer'
import Deposit from '../../../models/deposit'

const transactionsRoute = async (req, res) => {

  const deposit = await Deposit.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.deposit_id)
  }).fetch({
    withRelated: ['line_items.refund.payment','line_items.payment'],
    transacting: req.trx
  })

  if(!deposit) return res.status(404).respond({
    code: 404,
    message: 'Unable to load deposit'
  })

  res.status(200).respond(deposit.related('line_items'), DepositLineItemSerializer)

}

export default transactionsRoute
