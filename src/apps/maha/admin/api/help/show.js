import HelpArticleSerializer from '../../../serializers/help_article_serializer'
import HelpArticle from '../../../models/help_article'

const showRoute = async (req, res) => {

  const article = await HelpArticle.query(qb => {
    qb.where('id', req.params.id )
  }).fetch({
    withRelated: ['app','mobile','desktop','desktop_small'],
    transacting: req.trx
  })

  if(!article) return res.status(404).json({
    code: 404,
    message: 'Unable to find article'
  })

  res.status(200).respond(article, HelpArticleSerializer)

}

export default showRoute
