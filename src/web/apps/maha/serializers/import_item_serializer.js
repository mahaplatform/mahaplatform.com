const importItemSerializer = (req, result) => ({
  id: result.get('id'),
  values: result.get('values')
})

export default importItemSerializer
