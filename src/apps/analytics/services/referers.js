import Protocol from '@apps/analytics/models/protocol'
import Referer from '@apps/analytics/models/referer'
import Domain from '@apps/analytics/models/domain'
import URL from 'url'

export const getReferer = async(req, { data }) => {

  const url = URL.parse(data.page_referrer)

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

  const referer = await Referer.query(qb => {
    qb.where('protocol_id', protocol.get('id'))
    qb.where('domain_id', domain.get('id'))
    qb.where('path', url.path)
  }).fetch({
    transacting: req.analytics
  })

  if(referer) return referer

  return await Referer.forge({
    protocol_id: protocol.get('id'),
    domain_id: domain.get('id'),
    path: url.path
  }).save(null, {
    transacting: req.analytics
  })

}
