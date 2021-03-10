import HelpArticleSerializer from '@apps/maha/serializers/help_article_serializer'
import HelpArticle from '@apps/maha/models/help_article'

const listRoute = async (req, res) => {

  const articles = await HelpArticle.filterFetch({
    filter: {
      params: req.query.$filter,
      allowed: ['app_id']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['app','mobile','desktop','desktop_small'],
    transacting: req.trx
  })

  await res.status(200).respond(articles, HelpArticleSerializer)

}

export default listRoute
