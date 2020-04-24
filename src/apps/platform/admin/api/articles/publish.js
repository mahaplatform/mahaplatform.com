import socket from '../../../../../core/services/routes/emitter'
import HelpArticle from '../../../../maha/models/help_article'

const publishRoute = async (req, res) => {

  const help_article = await HelpArticle.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!help_article) return res.status(404).respond({
    code: 404,
    message: 'Unable to load article'
  })

  await help_article.save({
    is_published: req.body.is_published
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/platform/help/articles',
    `/admin/platform/help/articles/${req.params.id}`
  ])

  res.status(200).respond(true)

}

export default publishRoute
