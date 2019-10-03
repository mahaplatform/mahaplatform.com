const SourceSerializer = (req, result) => ({
  id: result.get('id'),
  text: result.get('text')
})

export default SourceSerializer
