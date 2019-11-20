const CouponSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  price_type: result.get('price_type'),
  fixed_type: result.get('fixed_type'),
  low_type: result.get('low_type'),
  high_type: result.get('high_type'),
  is_active: result.get('is_active'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default CouponSerializer
