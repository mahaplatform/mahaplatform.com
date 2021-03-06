const assetSerializer = (req, result) => ({
  id: result.get('id'),
  original_file_name: result.get('original_file_name'),
  file_name: result.get('file_name'),
  content_type: result.get('content_type'),
  file_size: result.get('file_size'),
  chunks_total: result.get('chunks_total'),
  resized_url: result.get('resized_url'),
  path: result.get('path'),
  signed_url: result.get('signed_url'),
  is_infected: result.get('is_infected'),
  url: result.get('url'),
  source: result.get('source'),
  source_url: result.get('source_url'),
  status: result.get('status'),
  user: user(result.related('user')),
  metadata: {
    width: result.get('width'),
    height: result.get('height')
  },
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const user = (user, key) => {
  if(!user.id) return null
  return {
    id: user.get('id'),
    account_id: user.get('account_id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo') ? user.related('photo').get('path') : null
  }
}

export default assetSerializer
