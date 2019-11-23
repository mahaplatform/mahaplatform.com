const PaymentSerializer = (req, result) => ({
  id: result.get('id'),
  amount: result.get('amount'),
  card_type: result.get('card_type'),
  contact: contact(result.related('contact')),
  date: result.get('date'),
  method: result.get('method'),
  reference: result.get('reference'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const contact = (contact) => {
  if(!contact.id) return null
  return {
    id: contact.get('id'),
    display_name: contact.get('display_name')
  }
}

export default PaymentSerializer
