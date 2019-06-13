import ReceiptSerializer from '../../../serializers/receipt_serializer'
import Receipt from '../../../models/receipt'

const showRoute = async (req, res) => {

  const receipt = await Receipt.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['asset.source','asset.user'],
    transacting: req.trx
  })

  if(!receipt) return req.status(404).respond({
    code: 404,
    message: 'Unable to load receipt'
  })

  res.status(200).respond(receipt, (receipt) => {
    return ReceiptSerializer(req, req.trx, receipt)
  })

}

export default showRoute
