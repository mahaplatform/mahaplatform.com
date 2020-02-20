import RefundSerializer from '../../../serializers/refund_serializer'
import Refund from '../../../models/refund'

const showRoute = async (req, res) => {

  const refund = await Refund.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['credit','payment.invoice.customer'],
    transacting: req.trx
  })

  if(!refund) return res.status(404).respond({
    code: 404,
    message: 'Unable to load refund'
  })

  res.status(200).respond(refund, RefundSerializer)

}

export default showRoute
