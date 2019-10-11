const FaxSerializer = (req, result) => ({
  id: result.get('id'),
  to: result.get('type') === 'outbound' ? result.get('to') : result.related('number').get('number'),
  from: result.get('type') === 'outbound' ? result.related('number').get('number') : result.get('from'),
  type: result.get('type'),
  status: result.get('status'),
  asset: asset(result.related('asset')),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})


const asset = (asset) => {
  if(!asset.id) return null
  return {
    id: asset.get('id'),
    original_file_name: asset.get('original_file_name'),
    file_name: asset.get('file_name'),
    content_type: asset.get('content_type'),
    file_size: asset.get('file_size'),
    status: asset.get('status'),
    has_preview: asset.get('has_preview'),
    is_infected: asset.get('is_infected'),
    path: asset.get('path'),
    signed_url: asset.get('signed_url'),
    source: asset.related('source').get('text'),
    source_url: asset.get('source_url'),
    user: user(asset.related('user')),
    created_at: asset.get('created_at'),
    updated_at: asset.get('updated_at')
  }
}

const user = (user) => {
  if(!user.id) return null
  return {
    id: user.get('id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo') ? user.related('photo').get('path') : null
  }
}

export default FaxSerializer
