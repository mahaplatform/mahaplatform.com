import MerchantSerializer from '../../../serializers/merchant_serializer'
import Merchant from '../../../models/merchant'

const showRoute = async (req, res) => {

  const merchant = await Merchant.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!merchant) return res.status(404).respond({
    code: 404,
    message: 'Unable to load merchant'
  })

  res.status(200).respond(merchant, MerchantSerializer)

}

export default showRoute
