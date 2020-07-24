const DepositLineItemSerializer = (req, result) => ({
  id: result.get('id'),
  type: result.get('type'),
  payment: payment(result.related('payment')),
  refund: refund(result.related('refund')),
  total: result.get('total'),
  fee: result.get('fee'),
  amount: result.get('amount')
})

const payment = (payment) => {
  if(!payment.id) return null
  return {
    id: payment.get('id'),
    reference: payment.get('reference')
  }
}

const refund = (refund) => {
  if(!refund.id) return null
  return {
    id: refund.get('id'),
    reference: refund.related('payment').get('reference')
  }
}

export default DepositLineItemSerializer
