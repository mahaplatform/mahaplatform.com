import Coupon from '../../../models/coupon'

const editRoute = async (req, res) => {

  const coupon = await Coupon.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!coupon) return res.status(404).respond({
    code: 404,
    message: 'Unable to load coupon'
  })

  res.status(200).respond(coupon, (req, coupon) => ({
    code: coupon.get('code'),
    type: coupon.get('type'),
    amount: coupon.get('amount'),
    percent: coupon.get('percent') ? coupon.get('percent') * 100 : null,
    product_id: coupon.get('product_id'),
    start_date: coupon.get('start_date'),
    end_date: coupon.get('end_date'),
    max_uses: coupon.get('max_uses')
  }))

}

export default editRoute
