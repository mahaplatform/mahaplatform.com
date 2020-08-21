const discountSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  type: result.get('type'),
  amount: result.get('amount'),
  percent: result.get('percent'),
  applies_to: result.get('applies_to'),
  applies_once: result.get('applies_once'),
  minimum_requirements: result.get('minimum_requirements'),
  minimum_amount: result.get('minimum_amount'),
  minimum_quantity: result.get('minimum_quantity'),
  starts_at: result.get('starts_at'),
  ends_at: result.get('ends_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default discountSerializer
