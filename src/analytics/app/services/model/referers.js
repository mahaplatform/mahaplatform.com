import Protocol from '@analytics/models/protocol'
import Referer from '@analytics/models/referer'
import Domain from '@analytics/models/domain'

export const getReferer = async(req, { enriched }) => {

  const protocol = await Protocol.fetchOrCreate({
    text: enriched.refr_urlscheme
  }, {
    transacting: req.analytics
  })

  const domain = await Domain.fetchOrCreate({
    text: enriched.refr_urlhost
  }, {
    transacting: req.analytics
  })

  const referer = await Referer.query(qb => {
    qb.where('protocol_id', protocol.get('id'))
    qb.where('domain_id', domain.get('id'))
    qb.where('path', enriched.refr_urlpath)
  }).fetch({
    transacting: req.analytics
  })

  if(referer) return referer

  return await Referer.forge({
    protocol_id: protocol.get('id'),
    domain_id: domain.get('id'),
    path: enriched.refr_urlpath
  }).save(null, {
    transacting: req.analytics
  })

}
