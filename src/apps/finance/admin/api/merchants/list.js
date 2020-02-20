import MerchantSerializer from '../../../serializers/merchant_serializer'
import Merchant from '../../../models/merchant'

const listRoute = async (req, res) => {

  const merchants = await Merchant.filter({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: req.query.$filter,
    filterParams: ['status'],
    searchParams: ['title'],
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
