const SourceSerializer = (req, trx, result) => ({

  id: result.get('id'),

  text: result.get('text')

})

export default SourceSerializer
