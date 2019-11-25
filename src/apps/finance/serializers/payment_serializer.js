const PaymentSerializer = (req, result) => ({
  id: result.get('id'),
  amount: result.get('amount'),
  braintree_id: result.get('braintree_id'),
  braintree_link: result.get('braintree_link'),
  card_type: result.get('card_type'),
  credit: credit(result.related('credit')),
  customer: customer(result.related('invoice').related('customer')),
  date: result.get('date'),
  description: result.get('description'),
  disbursement: disbursement(result.related('disbursement')),
  fee: result.get('fee'),
  method: result.get('method'),
  reference: result.get('reference'),
  scholarship: scholarship(result.related('scholarship')),
  status: result.get('status'),
  voided_at: result.get('voided_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const customer = (customer) => {
  if(!customer.id) return null
  return {
    id: customer.get('id'),
    display_name: customer.get('display_name')
  }
}

const disbursement = (disbursement) => {
  if(!disbursement.id) return null
  return {
    id: disbursement.get('id'),
    date: disbursement.get('date'),
    merchant: merchant(disbursement.related('merchant'))
  }
}

const merchant = (merchant) => {
  if(!merchant.id) return null
  return {
    id: merchant.get('id'),
    title: merchant.get('title'),
    braintree_id: merchant.get('braintree_id')
  }
}

const credit = (credit) => {
  if(!credit.id) return null
  return {
    id: credit.get('id')
  }
}

const scholarship = (scholarship) => {
  if(!scholarship.id) return null
  return {
    id: scholarship.get('id')
  }
}

export default PaymentSerializer
