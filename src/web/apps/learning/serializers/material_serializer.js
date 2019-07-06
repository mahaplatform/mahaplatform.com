const materialSerializer = (req, result) => ({
  id: result.get('id'),
  asset: asset(result.related('asset')),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const asset = (asset) => ({
  id: asset.get('id'),
  original_file_name: asset.get('original_file_name'),
  file_name: asset.get('file_name'),
  content_type: asset.get('content_type'),
  file_size: asset.get('file_size'),
  status: asset.get('text'),
  has_preview: asset.get('has_preview'),
  path: asset.get('path'),
  signed_url: asset.get('signed_url'),
  source: asset.related('source').get('text'),
  source_url: asset.get('source_url'),
  created_at: asset.get('created_at'),
  updated_at: asset.get('updated_at')
})

export default materialSerializer
