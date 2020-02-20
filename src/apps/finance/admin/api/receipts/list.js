import ReceiptSerializer from '../../../serializers/receipt_serializer'
import Receipt from '../../../models/receipt'

const listRoute = async (req, res) => {

  const receipts = await Receipt.filter({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filterParams: ['id'],
    filter: req.query.$filter,
    sort: req.query.$sort,
    defaultSort: ['id']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['asset.source','asset.user'],
    transacting: req.trx
  })

  res.status(200).respond(receipts, ReceiptSerializer)


}

export default listRoute
