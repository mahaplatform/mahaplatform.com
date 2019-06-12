import ReceiptSerializer from '../../../serializers/receipt_serializer'
import Receipt from '../../../models/receipt'

const listRoute = async (req, res) => {

  const receipts = await Receipt.query(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filterParams: ['id'],
    filter: req.query.$filter
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['id']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['asset.source','asset.user'],
    transacting: req.trx
  })

  res.status(200).respond(receipts, (receipt) => {
    return ReceiptSerializer(req, req.trx, receipt)
  })


}

export default listRoute
