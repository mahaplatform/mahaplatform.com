const receiptSerializer = (req, result) => ({
  id: result.related('asset').get('id'),
  original_file_name: result.related('asset').get('original_file_name'),
  file_name: result.related('asset').get('file_name'),
  content_type: result.related('asset').get('content_type'),
  file_size: result.related('asset').get('file_size'),
  chunks_total: result.related('asset').get('chunks_total'),
  icon: result.related('asset').get('icon'),
  path: result.related('asset').get('path'),
  source: result.related('asset').related('source').get('text'),
  source_url: result.related('asset').get('source_url'),
  status: result.related('asset').get('status'),
  user: user(result.related('asset').related('user')),
  signed_url: result.related('asset').get('signed_url'),
  is_infected: result.related('asset').get('is_infected'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
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

export default receiptSerializer
