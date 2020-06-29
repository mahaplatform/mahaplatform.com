const MerchantSerializer = (req, result) => ({
  id: result.get('id'),
  date: result.get('date'),
  merchant: merchant(result.related('merchant')),
  amount: result.get('amount'),
  total: result.get('total'),
  fee: result.get('fee'),
  payments_count: result.get('payments_count'),
  status: result.get('status'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const merchant = (merchant) => {
  if(!merchant.id) return null
  return {
    id: merchant.get('id'),
    title: merchant.get('title')
  }
}

export default MerchantSerializer
