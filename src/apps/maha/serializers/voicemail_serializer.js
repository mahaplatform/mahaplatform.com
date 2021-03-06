const voicemailSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  asset: asset(result.related('asset')),
  contact: contact(result.related('call').related('phone_number').related('contact')),
  phone_number: number(result.related('call').related('phone_number')),
  duration: result.get('duration'),
  was_heard: result.get('was_heard'),
  was_handled: result.get('was_handled'),
  deleted_at: result.get('deleted_at'),
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

const contact = (contact) => {
  if(!contact.id) return null
  return {
    id: contact.get('id'),
    display_name: contact.get('display_name'),
    initials: contact.get('initials'),
    rfc822: contact.get('rfc822'),
    phone_name: contact.get('phone_name'),
    photo: contact.related('photo') ? contact.related('photo').get('path') : null
  }
}

const asset = (asset) => {
  if(!asset.get('id')) return null
  return {
    id: asset.get('id'),
    original_file_name: asset.get('original_file_name'),
    file_name: asset.get('file_name'),
    file_size: asset.get('file_size'),
    content_type: asset.get('content_type'),
    has_preview: asset.get('has_preview'),
    is_image: asset.get('is_image'),
    status: asset.get('status'),
    icon: asset.get('icon'),
    path: asset.get('path'),
    signed_url: asset.get('signed_url'),
    source: asset.get('source'),
    source_url: asset.get('source_url')
  }
}

export default voicemailSerializer
