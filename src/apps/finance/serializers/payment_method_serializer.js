const PaymentMethodSerializer = (req, result) => ({
  id: result.get('id'),
  account_type: result.get('card_type'),
  card_type: result.get('card_type'),
  expiration_month: result.get('expiration_month'),
  expiration_year: result.get('expiration_year'),
  ownership_type: result.get('card_type'),
  last_four: result.get('last_four'),
  method: result.get('method'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default PaymentMethodSerializer
