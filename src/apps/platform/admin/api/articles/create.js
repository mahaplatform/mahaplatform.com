import HelpArticleSerializer from '../../../../maha/serializers/help_article_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import HelpArticle from '../../../../maha/models/help_article'

const createRoute = async (req, res) => {

  const article = await HelpArticle.forge({
    ...whitelist(req.body, ['app_id','video_id','title','body'])
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: article
  })

  await activity(req, {
    story: 'created {object}',
    object: article
  })

  await socket.refresh(req, [
    '/admin/platform/help/articles'
  ])

  res.status(200).respond(article, HelpArticleSerializer)

}

export default createRoute
