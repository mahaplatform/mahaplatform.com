const attachmentSerializer = (req, result) => ({
  id:result.get('id'),
  asset: asset(result.related('asset'))
})

const asset = (asset) => ({
  id: asset.get('id'),
  original_file_name: asset.get('original_file_name'),
  file_name: asset.get('file_name'),
  content_type: asset.get('content_type'),
  file_size: asset.get('file_size'),
  chunks_total: asset.get('chunks_total'),
  resized_url: asset.get('resized_url'),
  path: asset.get('path'),
  signed_url: asset.get('signed_url'),
  is_infected: asset.get('is_infected'),
  url: asset.get('url'),
  source: asset.related('source').get('text'),
  source_url: asset.get('source_url'),
  status: asset.get('status'),
  user: user(asset.related('user')),
  created_at: asset.get('created_at'),
  updated_at: asset.get('updated_at')
})

const user = (user, key) => {
  if(!user.id) return null
  return {
    id: user.get('id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo') ? user.related('photo').get('path') : null
  }
}

export default attachmentSerializer
