const AccountSerializer = (req, result) => ({
  id: result.get('id'),
  name: result.get('name'),
  is_active: result.get('is_active'),
  integration: result.get('integration'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default AccountSerializer
