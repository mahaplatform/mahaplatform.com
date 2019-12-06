const CouponSerializer = (req, result) => ({
  id: result.get('id'),
  description: result.get('description'),
  type: result.get('type'),
  last_four: result.get('last_four'),
  expiration_month: result.get('expiration_month'),
  expiration_year: result.get('expiration_year'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default CouponSerializer
