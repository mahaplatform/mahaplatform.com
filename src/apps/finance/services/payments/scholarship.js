import RouteError from '../../../../core/objects/route_error'
import Scholarship from '../../models/scholarship'
import Payment from '../../models/payment'

export const chargeScholarship = async (req, { invoice, date, amount, scholarship_id }) => {

  const scholarship = await Scholarship.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', scholarship_id)
  }).fetch({
    transacting: req.trx
  })

  if(!scholarship)  {
    throw new RouteError({
      status: 422,
      message: 'Unable to process payment',
      errors: {
        scholarship_id: ['Invalid credit']
      }
    })
  }

  if(Number(amount) > scholarship.get('amount')) {
    throw new RouteError({
      status: 422,
      message: 'Unable to process payment',
      errors: {
        amount: ['Insufficent funds on the balance of this scholarship']
      }
    })
  }

  return await Payment.forge({
    team_id: req.team.get('id'),
    invoice_id: invoice.get('id'),
    status: 'received',
    method: 'scholarship',
    scholarship_id: scholarship.get('id'),
    amount,
    date
  }).save(null, {
    transacting: req.trx
  })

}
