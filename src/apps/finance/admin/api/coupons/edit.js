import Coupon from '../../../models/coupon'

const editRoute = async (req, res) => {

  const coupon = await Coupon.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!coupon) return res.status(404).respond({
    code: 404,
    message: 'Unable to load coupon'
  })

  res.status(200).respond(coupon, {
    fields: [
      'id',
      'code',
      'type',
      'amount',
      'percent',
      'product_id',
      'start_date',
      'end_date',
      'max_uses'
    ]
  })

}

export default editRoute
