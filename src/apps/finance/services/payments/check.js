import Payment from '../../models/payment'

export const chargeCheck = async (req, { invoice, date, amount, reference, photo_id }) => {

  return await Payment.forge({
    team_id: req.team.get('id'),
    invoice_id: invoice.get('id'),
    status: 'received',
    method: 'check',
    reference,
    photo_id,
    amount,
    date
  }).save(null, {
    transacting: req.trx
  })

}
