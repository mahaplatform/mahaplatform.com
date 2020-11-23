const PaymentSerializer = (req, result) => ({
  id: result.get('id'),
  amount: result.get('amount'),
  braintree_id: result.get('braintree_id'),
  braintree_link: result.get('braintree_link'),
  paypal_id: result.get('paypal_id'),
  paypal_link: result.get('paypal_link'),
  credit: credit(result.related('credit')),
  date: result.get('date'),
  description: result.get('description'),
  deposit: deposit(result.related('deposit')),
  disbursed: result.get('disbursed'),
  fee: result.get('fee'),
  invoice: invoice(result.related('invoice')),
  bank: bank(result.related('bank')),
  method: result.get('method'),
  payment_method: payment_method(result.related('payment_method')),
  photo: photo(result.related('photo')),
  rate: result.get('rate'),
  reference: result.get('reference'),
  refunded: result.get('refunded'),
  refundable: result.get('refundable'),
  scholarship: scholarship(result.related('scholarship')),
  status: result.get('status'),
  voided_date: result.get('voided_date'),
  voided_reason: result.get('voided_reason'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const invoice = (invoice) => {
  if(!invoice.id) return null
  return {
    id: invoice.get('id'),
    code: invoice.get('code'),
    customer: customer(invoice.related('customer'))
  }
}

const customer = (customer) => {
  if(!customer.id) return null
  return {
    id: customer.get('id'),
    display_name: customer.get('display_name')
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

const credit = (credit) => {
  if(!credit.id) return null
  return {
    id: credit.get('id'),
    description: credit.get('description')
  }
}

const scholarship = (scholarship) => {
  if(!scholarship.id) return null
  return {
    id: scholarship.get('id')
  }
}

const photo = (photo) => {
  if(!photo.get('id')) return null
  return {
    id: photo.get('id'),
    original_file_name: photo.get('original_file_name'),
    file_name: photo.get('file_name'),
    file_size: photo.get('file_size'),
    content_type: photo.get('content_type'),
    has_preview: photo.get('has_preview'),
    is_image: photo.get('is_image'),
    status: photo.get('status'),
    icon: photo.get('icon'),
    path: photo.get('path'),
    signed_url: photo.get('signed_url'),
    source: photo.get('source'),
    source_url: photo.get('source_url')
  }
}

export default PaymentSerializer
