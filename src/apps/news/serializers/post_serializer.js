const PostSerializer = (req, result) => ({
  id: result.get('id'),
  attachments: result.related('attachments').map(attachment),
  comments: result.related('comments').map(comment),
  liker_ids: result.related('likes').map(like => like.get('user_id')),
  link: link(result.related('link')),
  text: result.get('text'),
  group: group(result.related('group')),
  user: user(result.related('user')),
  target_user: user(result.related('target_user')),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const user = (user) => {
  if(!user.id) return
  return {
    id: user.get('id'),
    account_id: user.get('account_id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo') ? user.related('photo').get('path') : null
  }
}

const group = (group) => {
  if(!group.id) return
  return {
    id: group.get('id'),
    title: group.get('title')
  }
}

const comment = (comment) => ({
  id: comment.get('id'),
  uid: comment.get('uid'),
  user: user(comment.related('user')),
  attachments: comment.related('attachments').map(attachment),
  reactions: comment.related('reactions').map(reaction),
  text: comment.get('text'),
  link: link(comment.related('link')),
  quoted_comment: quoted_comment(comment.related('quoted_comment')),
  created_at: comment.get('created_at'),
  updated_at: comment.get('updated_at')
})

const reaction = (reaction) => ({
  ...user(reaction.related('user')),
  type: reaction.get('type')
})

const link = (link) => {
  if(!link.id) return null
  return {
    id: link.get('id'),
    url: link.get('url'),
    image_height: link.get('image_height'),
    image_url: link.get('image_url'),
    image_width: link.get('image_width'),
    video_height: link.get('video_height'),
    video_url: link.get('video_url'),
    video_width: link.get('video_width'),
    service_icon: link.related('service').get('icon'),
    service_name: link.related('service').get('name'),
    service_url: link.related('service').get('url'),
    text: link.get('text'),
    title: link.get('title'),
    link: link.get('link')
  }
}

const quoted_comment = (comment) => {
  if(!comment.id) return
  return {
    id: comment.get('id'),
    code: comment.get('code'),
    user: user(comment.related('user')),
    text: comment.get('text'),
    created_at: comment.get('created_at')
  }
}

const attachment = (attachment) => {
  if(!attachment.id) return
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
  if(!asset.id) return
  return {
    id: asset.get('id'),
    content_type: asset.get('content_type'),
    original_file_name: asset.get('file_name'),
    file_name: asset.get('file_name'),
    file_size: asset.get('file_size'),
    icon: asset.get('icon'),
    path: asset.get('path'),
    source: asset.get('source'),
    source_url: asset.get('source_url')
  }
}

export default PostSerializer
