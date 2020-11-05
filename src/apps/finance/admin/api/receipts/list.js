import ReceiptSerializer from '@apps/finance/serializers/receipt_serializer'
import Receipt from '@apps/finance/models/receipt'

const listRoute = async (req, res) => {

  const receipts = await Receipt.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['id']
    },
    sort: {
      params: req.query.$sort,
      allowed: ['id']
    },
    page: req.query.$page,
    withRelated: ['asset.source','asset.user'],
    transacting: req.trx
  })

  res.status(200).respond(receipts, ReceiptSerializer)


}

export default listRoute
