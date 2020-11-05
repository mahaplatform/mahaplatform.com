import ReceiptSerializer from '@apps/finance/serializers/receipt_serializer'
import Receipt from '@apps/finance/models/receipt'

const showRoute = async (req, res) => {

  const receipt = await Receipt.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['asset.source','asset.user'],
    transacting: req.trx
  })

  if(!receipt) return res.status(404).respond({
    code: 404,
    message: 'Unable to load receipt'
  })

  res.status(200).respond(receipt, ReceiptSerializer)

}

export default showRoute
