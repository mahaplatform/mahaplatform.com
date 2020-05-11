const shortlinkSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  shortUrl: result.get('shortUrl'),
  url: result.get('url'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default shortlinkSerializer
