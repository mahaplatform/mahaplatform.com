import MerchantSerializer from '../../../../../finance/serializers/merchant_serializer'
import Merchant from '../../../../../finance/models/merchant'

const listRoute = async (req, res) => {

  const merchants = await Merchant.query(qb => {
    qb.where('team_id', req.params.team_id)
  }).fetchAll({
    transacting: req.trx
  })

  res.status(200).respond(merchants, MerchantSerializer)

}

export default listRoute
