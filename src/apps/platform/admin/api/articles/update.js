import HelpArticleSerializer from '../../../../maha/serializers/help_article_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import HelpArticle from '../../../../maha/models/help_article'

const updateRoute = async (req, res) => {

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

  await article.save({
    ...whitelist(req.body, ['app_id','desktop_id','desktop_small_id','mobile_id','title','body'])
  }, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'updated',
    auditable: article
  })

  await activity(req, {
    story: 'updated {object}',
    object: article
  })

  await socket.refresh(req, [
    '/admin/platform/help/articles',
    `/admin/platform/help/articles/${article.get('id')}`
  ])

  res.status(200).respond(article, HelpArticleSerializer)

}

export default updateRoute
