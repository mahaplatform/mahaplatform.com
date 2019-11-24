const PaymentSerializer = (req, result) => ({
  id: result.get('id'),
  amount: result.get('amount'),
  card_type: result.get('card_type'),
  credit: credit(result.related('credit')),
  customer: customer(result.related('invoice').related('customer')),
  date: result.get('date'),
  method: result.get('method'),
  reference: result.get('reference'),
  scholarship: scholarship(result.related('scholarship')),
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
