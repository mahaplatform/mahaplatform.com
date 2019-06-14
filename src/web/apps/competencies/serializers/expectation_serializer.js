const expectationSerializer = (req, result) => ({
  id: result.related('competency').get('id'),
  title: result.related('competency').get('title'),
  description: result.related('competency').get('description'),
  level: result.related('competency').get('level')
})

export default expectationSerializer
