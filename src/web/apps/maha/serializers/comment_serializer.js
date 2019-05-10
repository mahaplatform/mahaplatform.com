const commentSerializer = (req, trx, result) => ({

  id: result.get('id'),

  uid: result.get('uid'),

  user: user(result.related('user')),

  attachments: result.related('attachments').map(attachment),

  reactions: result.related('reactions').map(reaction),

  text: result.get('text'),

  quoted_comment: quoted_comment(result.related('quoted_comment')),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

})

const quoted_comment = (comment) => {

  if(!comment.id) return null

  return {

    id: comment.get('id'),

    code: comment.get('code'),

    user: user(comment.related('user')),

    text: comment.get('text'),

    created_at: comment.get('created_at')

  }

}

const reaction = (reaction) => ({

  ...user(reaction.related('user')),

  type: reaction.get('type')

})

const user = (user) => {

  if(!user.id) return null

  return {

    id: user.get('id'),

    full_name: user.get('full_name'),

    initials: user.get('initials'),

    photo: user.related('photo').get('path')

  }

}

const attachment = (attachment) => {

  if(!attachment.id) return null

  return {

    id: attachment.get('id'),

    type: attachment.get('type'),

    caption: attachment.get('caption'),

    from_url: attachment.get('from_url'),

    title_link: attachment.get('title_link'),

    asset: asset(attachment.related('asset'))

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

export default commentSerializer
