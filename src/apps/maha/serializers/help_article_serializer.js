const helpArticleSerializer = (req, result) => ({
  id: result.get('id'),
  app: app(result.related('app')),
  title: result.get('title'),
  body: result.get('body'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const app = (app) => ({
  id: app.get('id'),
  ...app.get('data')
})

export default helpArticleSerializer
