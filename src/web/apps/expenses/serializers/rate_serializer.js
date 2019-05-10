const RatesSerializer = (req, trx, result) => ({

  id: result.get('id'),

  year: result.get('year'),

  value: result.get('value'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

})

export default RatesSerializer
