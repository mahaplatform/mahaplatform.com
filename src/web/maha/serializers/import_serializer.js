import serializer from '../core/objects/serializer'

const importSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  asset: asset(result.related('asset')),

  stage: result.get('stage'),

  delimiter: result.get('delimiter'),

  headers: result.get('headers'),

  mapping: result.get('mapping'),

  user: user(result.related('user')),

  name: result.get('name'),

  strategy: result.get('strategy'),

  object_type: result.get('object_type'),

  completed_count: result.get('completed_count'),

  valid_count: result.get('valid_count'),

  error_count: result.get('error_count'),

  omit_count: result.get('omit_count'),

  duplicate_count: result.get('duplicate_count'),

  nonunique_count: result.get('nonunique_count'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

const user = (user) => {

  if(!user.id) return null

  return {

    id: user.get('id'),

    full_name: user.get('full_name'),

    initials: user.get('initials'),

    photo: user.related('photo').get('path')

  }

}

const asset = (asset) => {

  if(!asset.id) return null

  return {

    id: asset.get('id'),

    content_type: asset.get('content_type'),

    original_file_name: asset.get('file_name'),

    file_name: asset.get('file_name'),

    file_size: asset.get('file_size'),

    icon: asset.get('icon'),

    path: asset.get('path'),

    source: asset.related('source').get('text'),

    source_url: asset.get('source_url')

  }

}

export default importSerializer
