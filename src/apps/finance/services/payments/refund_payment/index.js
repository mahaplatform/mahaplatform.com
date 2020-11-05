import Allocation from '@apps/finance/models/allocation'
import { refundBraintree } from './braintree'
import { refundPaypal } from './paypal'
import { refundCredit } from './credit'
import _ from 'lodash'

const getRefundCreator = (type) => {
  if(_.includes(['ach','card'], type)) return refundBraintree
  if(type === 'paypal') return refundBraintree
  if(type === 'paypal') return refundPaypal
  if(type === 'credit') return refundCredit
}

export const refundPayment = async (req, params) => {

  const { allocations, amount, payment, type } = params

  const refundCreator = getRefundCreator(type)

  const refund = await refundCreator(req, {
    allocations,
    amount,
    payment
  })

  const sum = payment.related('allocations').filter((allocation) => {
    return _.includes(req.body.allocations, allocation.get('line_item_id'))
  }).reduce((total, allocation) => {
    return total + Number(allocation.related('line_item').get('total'))
  }, 0.00)

  const sorted = req.body.allocations.map(line_item_id => {
    const line_item = payment.related('allocations').find((allocation) => {
      return allocation.get('line_item_id') === line_item_id
    })
    return {
      id: line_item.get('line_item_id'),
      amount: Math.round(line_item.get('total') / sum * Number(req.body.amount) * 100, 2) / 100
    }
  }).sort((li1, li2) => {
    return li1.amount < li2.amount ? 1 : -1
  })

  const total = sorted.reduce((total, line_item) => {
    return total + line_item.amount
  }, 0.00)

  const diff = Math.round((Number(req.body.amount) - Number(total)) * 100, 2) / 100

  await Promise.mapSeries(sorted, async(line_item, index) => {
    const amount = line_item.amount + (index === 0 ? diff : 0)
    await Allocation.forge({
      team_id: req.team.get('id'),
      refund_id: refund.get('id'),
      line_item_id: line_item.id,
      amount,
      fee: 0.00,
      total: amount
    }).save(null, {
      transacting: req.trx
    })
  })

  return refund

}
