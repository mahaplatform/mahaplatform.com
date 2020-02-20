import MerchantSerializer from '../../../serializers/merchant_serializer'
import Merchant from '../../../models/merchant'

const listRoute = async (req, res) => {

  const merchants = await Merchant.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['status'],
      search: ['title']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['-created_at'],
      allowed: ['id','title','created_at']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(merchants, MerchantSerializer)

}

export default listRoute
