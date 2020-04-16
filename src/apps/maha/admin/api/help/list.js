import HelpArticleSerializer from '../../../serializers/help_article_serializer'
import HelpArticle from '../../../models/help_article'

const listRoute = async (req, res) => {

  const articles = await HelpArticle.filterFetch({
    scope: (qb) => {
      qb.innerJoin('maha_roles_apps', 'maha_roles_apps.app_id', 'maha_help_articles.app_id')
      qb.joinRaw('inner join maha_users_roles on maha_users_roles.role_id=maha_roles_apps.role_id and maha_users_roles.user_id=?', req.user.get('id'))
    },
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
