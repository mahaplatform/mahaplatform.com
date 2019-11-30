const CreditSerializer = (req, result) => ({
  id: result.get('id'),
  braintree_id: result.get('braintree_id'),
  braintree_link: result.get('braintree_link'),
  display_name: result.get('display_name'),
  first_name: result.get('first_name'),
  last_name: result.get('last_name'),
  email: result.get('email'),
  phone: result.get('phone'),
  address: result.get('address'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default CreditSerializer
