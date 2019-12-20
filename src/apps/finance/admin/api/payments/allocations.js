import RevenueSerializer from '../../../serializers/revenue_serializer'
import Revenue from '../../../models/revenue'

const allocationsRoute = async (req, res) => {

  const revenues = await Revenue.scope(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('payment_id', req.params.payment_id)
  }).fetchAll({
    transacting: req.trx
  })

  res.status(200).respond(revenues, RevenueSerializer)

}

export default allocationsRoute
