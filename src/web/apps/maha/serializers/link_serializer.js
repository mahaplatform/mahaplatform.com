const LinkSerializer = (req, trx, result) => ({

  id: result.get('id'),

  url: result.get('url'),

  image_height: result.get('image_height'),

  image_url: result.get('image_url'),

  image_width: result.get('image_width'),

  video_height: result.get('video_height'),

  video_url: result.get('video_url'),

  video_width: result.get('video_width'),

  service_icon: result.related('service').get('icon'),

  service_name: result.related('service').get('name'),

  service_url: result.related('service').get('url'),

  text: result.get('text'),

  title: result.get('title'),

  result: result.get('result'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

})

export default LinkSerializer
