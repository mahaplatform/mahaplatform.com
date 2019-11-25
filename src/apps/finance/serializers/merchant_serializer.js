const MerchantSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  bank_name: result.get('bank_name'),
  routing_number: result.get('routing_number'),
  account_number: result.get('account_number'),
  braintree_id: result.get('braintree_id'),
  has_paypal: result.get('has_paypal'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default MerchantSerializer
