const CouponSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  percent: result.get('percent'),
  amount: result.get('amount'),
  is_active: result.get('is_active'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default CouponSerializer
