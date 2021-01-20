import Protocol from '@apps/analytics/models/protocol'
import Domain from '@apps/analytics/models/domain'
import Page from '@apps/analytics/models/page'
import URL from 'url'

export const getPage = async(req, data) => {

  const url = URL.parse(data.url)

  const protocol = await Protocol.fetchOrCreate({
    text: url.protocol.slice(0, -1)
  }, {
    transacting: req.analytics
  })

  const domain = await Domain.fetchOrCreate({
    text: url.hostname
  }, {
    transacting: req.analytics
  })

  const page = await Page.query(qb => {
    qb.where('protocol_id', protocol.get('id'))
    qb.where('domain_id', domain.get('id'))
    qb.where('path', url.path)
    qb.where('title', data.title)
  }).fetch({
    transacting: req.analytics
  })

  if(page) return page

  return await Page.forge({
    title: data.title,
    protocol_id: protocol.get('id'),
    domain_id: domain.get('id'),
    path: url.path
  }).save(null, {
    transacting: req.analytics
  })

}
