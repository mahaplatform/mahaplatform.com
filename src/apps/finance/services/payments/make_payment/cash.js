import Payment from '../../../models/payment'

export const chargeCash = async (req, { invoice, date, amount }) => {

  return await Payment.forge({
    team_id: req.team.get('id'),
    invoice_id: invoice.get('id'),
    status: 'received',
    method: 'cash',
    amount,
    date
  }).save(null, {
    transacting: req.trx
  })

}
