const SMSSerializer = (req, result) => ({
  id: result.get('id'),
  body: result.get('body'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})


export default SMSSerializer
