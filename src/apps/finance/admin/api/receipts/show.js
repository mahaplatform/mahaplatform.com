import ReceiptSerializer from '../../../serializers/receipt_serializer'
import Receipt from '../../../models/receipt'

const showRoute = async (req, res) => {

  const receipt = await Receipt.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
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
