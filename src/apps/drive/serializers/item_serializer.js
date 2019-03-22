import { serializer } from 'maha'
import _ from 'lodash'

const ItemSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  code: result.get('code'),

  type: result.get('type'),

  access_type: result.get('access_type'),

  item_id: result.get('item_id'),

  label: result.get('label'),

  folder: folder(result.related('folder')),

  accesses: result.related('accesses').map(access),

  asset: asset(result.related('asset')),

  is_starred: _.includes(req.starred, result.get('code')),

  deleted_at: result.get('deleted_at'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

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

  is_everyone: access.get('is_everyone'),

  user: user(access.related('user')),

  group: group(access.related('group')),

  access_type: access.related('access_type').get('text')

})

const asset = (asset) => {

  if(!asset.get('id')) return null

  return {

    id: asset.get('id'),

    original_file_name: asset.get('original_file_name'),

    file_name: asset.get('file_name'),

    content_type: asset.get('content_type'),

    file_size: asset.get('file_size'),

    has_preview: asset.get('has_preview'),

    path: asset.get('path'),

    source: asset.related('source').get('text'),

    source_url: asset.get('source_url'),

    deleted_at: asset.get('deleted_at'),

    created_at: asset.get('created_at'),

    updated_at: asset.get('updated_at')

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

    full_name: user.get('full_name'),

    initials: user.get('initials'),

    photo: user.related('photo') ? user.related('photo').get('path') : null

  }

}

export default ItemSerializer
