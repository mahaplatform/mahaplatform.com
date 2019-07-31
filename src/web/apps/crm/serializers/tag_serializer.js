const TagSerializer = (req, result) => ({
  id: result.get('id'),
  text: result.get('text')
})

export default TagSerializer
