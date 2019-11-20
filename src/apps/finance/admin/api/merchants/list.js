import MerchantSerializer from '../../../serializers/merchant_serializer'
import Merchant from '../../../models/merchant'

const listRoute = async (req, res) => {

  const merchants = await Merchant.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    searchParams: ['title']
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['-created_at'],
    sortParams: ['id','title','created_at']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(merchants, MerchantSerializer)

}

export default listRoute
