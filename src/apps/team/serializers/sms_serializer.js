const SMSSerializer = (req, result) => ({
  id: result.get('id'),
  to: number(result.related('to')),
  from: number(result.related('from')),
  attachments: result.related('attachments').map(attachment),
  body: result.get('body'),
  type: result.get('type'),
  status: result.get('status'),
  price: result.get('price'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const number = (number) => {
  if(!number.id) return null
  return {
    id: number.get('id'),
    number: number.get('number'),
    formatted: number.get('formatted')
  }
}

const attachment = (attachment) => {
  if(!attachment.id) return null
  return {
    id: attachment.get('id'),
    asset: asset(attachment.related('asset'))
  }
}

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
    created_at: asset.get('created_at'),
    updated_at: asset.get('updated_at')
  }
}
export default SMSSerializer
