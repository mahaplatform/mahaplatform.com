const PaymentSerializer = (req, result) => ({
  id: result.get('id'),
  amount: result.get('amount'),
  card_type: result.get('card_type'),
  customer: customer(result.related('invoice').related('customer')),
  date: result.get('date'),
  method: result.get('method'),
  reference: result.get('reference'),
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

export default PaymentSerializer
