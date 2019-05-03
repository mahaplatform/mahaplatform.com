import serializer from '../../../core/objects/serializer'

const resourceSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  title: result.get('title'),

  description: result.get('description'),

  url: result.get('url'),

  review_average: result.get('review_average'),

  review_count: result.get('review_count'),

  asset: asset(result.related('asset')),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

const asset = (asset) => {

  if(!asset.id) return null

  return {

    id: asset.get('id'),

    original_file_name: asset.get('original_file_name'),

    file_name: asset.get('file_name'),

    content_type: asset.get('content_type'),

    file_size: asset.get('file_size'),

    status: asset.related('status').get('text'),

    has_preview: asset.get('has_preview'),

    path: asset.get('path'),

    source: asset.related('source').get('text'),

    source_url: asset.get('source_url'),

    user: user(asset.related('user')),

    created_at: asset.get('created_at'),

    updated_at: asset.get('updated_at')

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

export default resourceSerializer
