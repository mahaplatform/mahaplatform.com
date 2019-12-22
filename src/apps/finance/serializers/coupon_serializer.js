const CouponSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  product: product(result.related('product')),
  type: result.get('type'),
  percent: result.get('percent'),
  amount: result.get('amount'),
  is_active: result.get('is_active'),
  start_date: result.get('start_date'),
  end_date: result.get('end_date'),
  max_uses: result.get('max_uses'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const product = (product) => {
  if(!product.id) return null
  return {
    id: product.get('id'),
    title: product.get('title')
  }
}

export default CouponSerializer
