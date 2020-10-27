const UndepositedSerializer = (req, result) => ({
  id: result.get('id'),
  invoice: invoice(result.related('invoice')),
  type: result.get('type'),
  method: result.get('method'),
  date: result.get('date'),
  amount: result.get('amount'),
  created_at: result.get('created_at')
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

export default UndepositedSerializer
