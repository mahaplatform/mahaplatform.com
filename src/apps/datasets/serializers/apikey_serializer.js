const apikeySerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  access_token: result.get('access_token'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default apikeySerializer
