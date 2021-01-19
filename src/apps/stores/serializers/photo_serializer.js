const photoSerializer = (req, result) => ({
  ...asset(result.related('asset')),
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
    chunks_total: asset.get('chunks_total'),
    resized_url: asset.get('resized_url'),
    path: asset.get('path'),
    signed_url: asset.get('signed_url'),
    is_infected: asset.get('is_infected'),
    url: asset.get('url'),
    source: asset.get('source'),
    source_url: asset.get('source_url'),
    status: asset.get('status'),
    metadata: {
      width: asset.get('width'),
      height: asset.get('height')
    }
  }
}

export default photoSerializer
