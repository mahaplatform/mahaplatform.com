const importItemSerializer = (req, trx, result) => ({

  id: result.get('id'),

  values: result.get('values')

})

export default importItemSerializer
