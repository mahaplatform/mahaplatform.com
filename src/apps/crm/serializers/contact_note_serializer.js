const NoteSerializer = (req, result) => ({
  id: result.get('id'),
  text: result.get('text'),
  attachments: result.related('attachments').map(asset),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const asset = (asset) => {
  if(!asset.id) return null
  return {
    id: asset.get('id'),
    content_type: asset.get('content_type'),
    has_preview: asset.get('has_preview'),
    original_file_name: asset.get('original_file_name'),
    file_name: asset.get('file_name'),
    file_size: asset.get('file_size'),
    icon: asset.get('icon'),
    path: asset.get('path'),
    source: asset.related('source').get('text'),
    source_url: asset.get('source_url'),
    signed_url: asset.get('signed_url'),
    is_infected: asset.get('is_infected')
  }
}

export default NoteSerializer
