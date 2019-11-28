const PaymentSerializer = (req, result) => ({
  id: result.get('id'),
  amount: result.get('amount'),
  braintree_id: result.get('braintree_id'),
  braintree_link: result.get('braintree_link'),
  credit: credit(result.related('credit')),
  payment: payment(result.related('payment')),
  status: result.get('status'),
  type: result.get('type'),
  voided_date: result.get('voided_date'),
  voided_reason: result.get('voided_reason'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const credit = (credit) => {
  if(!credit.id) return null
  return {
    id: credit.get('id'),
    amount: credit.get('amount')
  }
}

const payment = (payment) => {
  if(!payment.id) return null
  return {
    id: payment.get('id'),
    code: payment.get('code'),
    customer: customer(payment.related('invoice').related('customer'))
  }
}

const customer = (customer) => {
  if(!customer.id) return null
  return {
    id: customer.get('id'),
    display_name: customer.get('display_name')
  }
}

export default PaymentSerializer
