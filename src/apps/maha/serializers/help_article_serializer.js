const helpArticleSerializer = (req, result) => ({
  id: result.get('id'),
  app: app(result.related('app')),
  video: video(result.related('video')),
  title: result.get('title'),
  body: result.get('body'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const app = (app) => ({
  id: app.get('id'),
  ...app.get('data')
})

const video = (video) => {
  if(!video.id) return null
  return {
    id: video.get('id'),
    original_file_name: video.get('original_file_name'),
    file_name: video.get('file_name'),
    content_type: video.get('content_type'),
    file_size: video.get('file_size'),
    status: video.get('status'),
    has_preview: video.get('has_preview'),
    is_infected: video.get('is_infected'),
    path: video.get('path'),
    signed_url: video.get('signed_url'),
    source: video.related('source').get('text'),
    source_url: video.get('source_url'),
    created_at: video.get('created_at'),
    updated_at: video.get('updated_at')
  }
}

export default helpArticleSerializer
