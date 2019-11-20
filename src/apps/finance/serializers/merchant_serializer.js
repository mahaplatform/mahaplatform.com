const MerchantSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  braintree_id: result.get('braintree_id'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default MerchantSerializer
