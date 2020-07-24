const DepositSerializer = (req, result) => ({
  id: result.get('id'),
  date: result.get('date'),
  bank: bank(result.related('bank')),
  amount: result.get('amount'),
  total: result.get('total'),
  fee: result.get('fee'),
  payments_count: result.get('payments_count'),
  refunds_count: result.get('refunds_count'),
  status: result.get('status'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const bank = (bank) => {
  if(!bank.id) return null
  return {
    id: bank.get('id'),
    title: bank.get('title')
  }
}

export default DepositSerializer
