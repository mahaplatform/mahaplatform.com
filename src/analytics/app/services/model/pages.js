import Protocol from '@analytics/models/protocol'
import Domain from '@analytics/models/domain'
import Page from '@analytics/models/page'

export const getPage = async(req, { enriched }) => {

  const protocol = await Protocol.fetchOrCreate({
    text: enriched.page_urlscheme
  }, {
    transacting: req.analytics
  })

  const domain = await Domain.fetchOrCreate({
    text: enriched.page_urlhost
  }, {
    transacting: req.analytics
  })

  const page = await Page.query(qb => {
    qb.where('protocol_id', protocol.get('id'))
    qb.where('domain_id', domain.get('id'))
    qb.where('path', enriched.page_urlpath)
    qb.where('title', enriched.page_title)
  }).fetch({
    transacting: req.analytics
  })

  if(page) return page

  return await Page.forge({
    title: enriched.page_title,
    protocol_id: protocol.get('id'),
    domain_id: domain.get('id'),
    path: enriched.page_urlpath
  }).save(null, {
    transacting: req.analytics
  })

}
