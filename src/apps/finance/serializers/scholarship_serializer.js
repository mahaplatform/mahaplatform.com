const ScholarshipSerializer = (req, result) => ({
  id: result.get('id'),
  balance: result.get('balance'),
  amount: result.get('amount'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default ScholarshipSerializer
