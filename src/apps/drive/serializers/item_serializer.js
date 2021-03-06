import _ from 'lodash'

const ItemSerializer = (req, result) => ({
  code: result.get('code'),
  type: result.get('type'),
  access_type: result.get('access_type'),
  item_id: result.get('item_id'),
  label: result.get('label'),
  folder: folder(result.related('folder')),
  accesses: result.related('accesses').map(access),
  asset: asset(result.related('asset')),
  owned_by: result.get('owned_by'),
  file_size: result.get('file_size'),
  is_starred: _.includes(req.starred, result.get('code')),
  locked_by: result.get('locked_by'),
  lock_expires_at: result.get('lock_expires_at'),
  lock_token: result.get('lock_token'),
  deleted_at: result.get('deleted_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const folder = (folder) => {
  if(!folder.id) return null
  return {
    id: folder.get('id'),
    code: folder.get('code'),
    label: folder.get('label'),
    created_at: folder.get('created_at'),
    updated_at: folder.get('updated_at')
  }
}

const access = (access) => ({
  grouping: grouping(access.related('grouping')),
  user: user(access.related('user')),
  group: group(access.related('group')),
  access_type: access.related('access_type').get('text')
})

const asset = (asset) => {
  if(!asset.id) return null
  return {
    id: asset.get('id'),
    original_file_name: asset.get('original_file_name'),
    file_name: asset.get('file_name'),
    content_type: asset.get('content_type'),
    file_size: asset.get('file_size'),
    has_preview: asset.get('has_preview'),
    is_infected: asset.get('is_infected'),
    path: asset.get('path'),
    signed_url: asset.get('signed_url'),
    source: asset.get('source'),
    source_url: asset.get('source_url'),
    status: asset.get('status'),
    metadata: {
      width: asset.get('width'),
      height: asset.get('height')
    },
    created_at: asset.get('created_at'),
    updated_at: asset.get('updated_at')
  }
}

const grouping = (grouping) => {
  if(!grouping.id) return null
  return {
    id: grouping.get('id'),
    title: grouping.get('title')
  }
}

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
    account_id: user.get('account_id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo') ? user.related('photo').get('path') : null
  }
}

export default ItemSerializer
