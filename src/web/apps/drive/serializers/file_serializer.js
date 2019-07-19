const FileSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  asset: asset(result.related('current_version').related('asset')),
  versions: result.related('versions').map(version),
  version_id: result.get('version_id'),
  label: result.get('label'),
  folder: folder(result.related('folder')),
  accesses: result.related('accesses').map(access),
  locked_by: result.get('locked_by'),
  lock_expires_at: result.get('lock_expires_at'),
  lock_token: result.get('lock_token'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const version = (version) => {

  if(!version.id) return null

  return {
    id: version.get('id'),
    asset: asset(version.related('asset')),
    user: user(version.related('user')),
    created_at: version.get('created_at'),
    updated_at: version.get('updated_at')
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
    path: asset.get('path'),
    signed_url: asset.get('signed_url'),
    source: asset.related('source').get('text'),
    source_url: asset.get('source_url'),
    user: user(asset.related('user')),
    created_at: asset.get('created_at'),
    updated_at: asset.get('updated_at')
  }

}

const folder = (folder) => {

  if(!folder.get('id')) return null

  return {
    id: folder.get('id'),
    code: folder.get('code'),
    label: folder.get('label'),
    created_at: folder.get('created_at'),
    updated_at: folder.get('updated_at')
  }

}

const access = (access) => ({
  grouping: access.get('grouping'),
  group: group(access.related('group')),
  user: user(access.related('user')),
  access_type: access.related('access_type').get('text')
})

const group = (group) => {

  if(!group.id) return null

  return {
    id: group.get('id'),
    title: group.get('title')
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

export default FileSerializer
