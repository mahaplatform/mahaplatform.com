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
  deposit: deposit(result.related('deposit')),
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

const deposit = (deposit) => {
  if(!deposit.id) return null
  return {
    id: deposit.get('id'),
    date: deposit.get('date'),
    bank: bank(deposit.related('bank'))
  }
}

const bank = (bank) => {
  if(!bank.id) return null
  return {
    id: bank.get('id'),
    title: bank.get('title'),
    braintree_id: bank.get('braintree_id')
  }
}

const payment = (payment) => {
  if(!payment.id) return null
  return {
    id: payment.get('id'),
    reference: payment.get('reference'),
    method: payment.get('method'),
    payment_method: payment_method(payment.related('payment_method')),
    customer: customer(payment.related('invoice').related('customer'))
  }
}

const payment_method = (payment_method) => {
  if(!payment_method.id) return null
  return {
    id: payment_method.get('id'),
    account_type: payment_method.get('card_type'),
    card_type: payment_method.get('card_type'),
    email: payment_method.get('email'),
    expiration_month: payment_method.get('expiration_month'),
    expiration_year: payment_method.get('expiration_year'),
    ownership_type: payment_method.get('card_type'),
    last_four: payment_method.get('last_four'),
    method: payment_method.get('method')
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
