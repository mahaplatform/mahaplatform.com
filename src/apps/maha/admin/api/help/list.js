import HelpArticleSerializer from '../../../serializers/help_article_serializer'
import HelpArticle from '../../../models/help_article'

const listRoute = async (req, res) => {

  const articles = await HelpArticle.filterFetch({
    scope: (qb) => {},
    filter: {
      params: req.query.$filter,
      search: ['title']
    },
    withRelated: ['app'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(articles, HelpArticleSerializer)

}

export default listRoute
