import socket from '@core/services/routes/emitter'
import HelpArticle from '../../../../maha/models/help_article'

const publishAllRoute = async (req, res) => {

  const ids = await HelpArticle.filterFetch({
    filter: {
      params: req.body.filter
    },
    transacting: req.trx
  }).then(results => results.map(result => {
    return result.get('id')
  }))

  await req.trx('maha_help_articles')
    .whereIn('id',ids)
    .update('is_published', req.body.is_published)

  await socket.refresh(req, [
    '/admin/platform/help/articles'
  ])

  res.status(200).respond(true)

}

export default publishAllRoute
