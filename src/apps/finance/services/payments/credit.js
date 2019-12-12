import RouteError from '../../../../core/objects/route_error'
import Payment from '../../models/payment'
import Credit from '../../models/credit'

export const chargeCredit = async (req, { invoice, date, amount, credit_id }) => {

  const credit = await Credit.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', credit_id)
  }).fetch({
    transacting: req.trx
  })

  if(!credit)  {
    throw new RouteError({
      status: 422,
      message: 'Unable to process payment',
      errors: {
        credit_id: ['Invalid credit']
      }
    })
  }

  if(Number(amount) > credit.get('amount')) {
    throw new RouteError({
      status: 422,
      message: 'Unable to process payment',
      errors: {
        amount: ['Insufficent funds on the balance of this credit']
      }
    })
  }

  return await Payment.forge({
    team_id: req.team.get('id'),
    invoice_id: invoice.get('id'),
    status: 'applied',
    method: 'credit',
    credit_id: credit.get('id'),
    amount,
    date
  }).save(null, {
    transacting: req.trx
  })

}
