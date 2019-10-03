const CountySerializer = (req, result) => ({
  id: result.get('id'),
  name: result.get('name')
})

export default CountySerializer
