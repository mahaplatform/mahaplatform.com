import { getAllocations } from './get_allocations'

export const updateRates = async (req, { payment_id, rate, cross_border_rate }) => {

  await req.trx('finance_payments').where('id', payment_id).update({
    rate,
    cross_border_rate
  })

  const allocations = await getAllocations(req, {
    payment_id
  })

  await Promise.mapSeries(allocations, async (allocation, index) => {
    await req.trx('finance_allocations').where(qb => {
      qb.where('payment_id', allocation.payment_id)
      qb.where('line_item_id', allocation.line_item_id)
    }).update({
      amount: allocation.amount,
      fee: allocation.fee,
      total: allocation.total
    })
  })

}
