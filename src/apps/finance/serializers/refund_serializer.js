const PaymentSerializer = (req, result) => ({
  id: result.get('id'),
  amount: result.get('amount'),
  customer: customer(result.related('payment').related('invoice').related('customer')),
  date: result.get('date'),
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
