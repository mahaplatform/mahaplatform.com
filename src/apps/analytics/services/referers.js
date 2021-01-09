import Referer from '@apps/analytics/models/referer'
import Domain from '@apps/analytics/models/domain'
import URL from 'url'

export const getReferer = async(req, { data }) => {

  const referer = await Referer.query(qb => {
    qb.where('url', data.page_referrer)
  }).fetch({
    transacting: req.trx
  })

  if(referer) return referer

  const url = URL.parse(data.page_referrer)

  const domain = await Domain.fetchOrCreate({
    name: url.hostname
  }, {
    transacting: req.trx
  })

  return await Referer.forge({
    domain_id: domain.get('id'),
    url: data.page_referrer,
    path: url.path
  }).save(null, {
    transacting: req.trx
  })

}
