const CreditSerializer = (req, result) => ({
  id: result.get('id'),
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
