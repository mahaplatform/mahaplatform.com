const MessageSerializer = (req, result) => ({
  id: result.get('id'),
  channel_id: parseInt(result.get('channel_id')),
  code: result.get('code'),
  user: user(result.related('user')),
  text: result.get('text'),
  type: result.related('message_type').get('text'),
  link: link(result.related('link')),
  attachments: result.related('attachments').map(attachment),
  reactions: result.related('reactions').map(reaction),
  quoted_message: quoted_message(result.related('quoted_message')),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const quoted_message = (message) => {

  if(!message.id) return null

  return {
    id: message.get('id'),
    code: message.get('code'),
    user: user(message.related('user')),
    text: message.get('text'),
    created_at: message.get('created_at')
  }

}

const reaction = (reaction) => ({
  id: reaction.related('user').get('id'),
  full_name: reaction.related('user').get('full_name'),
  initials: reaction.related('user').get('initials'),
  photo: reaction.related('user').related('photo') ? reaction.related('user').related('photo').get('path') : null,
  type: reaction.get('type')
})

const user = (user) => {

  if(!user) return null

  return {
    id: user.get('id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo') ? user.related('photo').get('path') : null,
    last_online_at: user.get('last_online_at')
  }

}

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
    has_preview: asset.get('has_preview'),
    original_file_name: asset.get('original_file_name'),
    file_name: asset.get('file_name'),
    file_size: asset.get('file_size'),
    icon: asset.get('icon'),
    path: asset.get('path'),
    source: asset.related('source').get('text'),
    source_url: asset.get('source_url'),
    signed_url: asset.get('signed_url'),
    is_infected: asset.get('is_infected')
  }

}

export default MessageSerializer
