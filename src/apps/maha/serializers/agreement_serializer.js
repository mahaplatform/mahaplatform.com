const agreementSerializer = (req, result) => ({
  id: result.get('id'),
  signed: signed(result.related('signed')),
  email: result.get('email'),
  url: result.get('url'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const signed = (asset) => {
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
    source: asset.get('source'),
    source_url: asset.get('source_url'),
    created_at: asset.get('created_at'),
    updated_at: asset.get('updated_at')
  }
}

export default agreementSerializer
