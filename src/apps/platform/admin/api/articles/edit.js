import HelpArticle from '../../../../maha/models/help_article'

const editRoute = async (req, res) => {

  const article = await HelpArticle.query(qb => {
    qb.where('id', req.params.id )
  }).fetch({
    withRelated: ['app'],
    transacting: req.trx
  })

  if(!article) return res.status(404).json({
    code: 404,
    message: 'Unable to find article'
  })

  res.status(200).respond(article, (req, article) => ({
    app_id: article.get('app_id'),
    video_id: article.get('video_id'),
    title: article.get('title'),
    body: article.get('body')
  }))

}

export default editRoute
