import Referer from '@apps/analytics/models/referer'

export const getReferer = async(req, { raw }) => {

  const referer = await Referer.query(qb => {
    qb.where('url', raw.get('page_referrer'))
  }).fetch({
    transacting: req.trx
  })

  if(referer) return referer

  return await Referer.forge({
    url: raw.get('page_referrer'),
    urlscheme: raw.get('refr_urlscheme'),
    urlhost: raw.get('refr_urlhost'),
    urlport: raw.get('refr_urlport'),
    urlpath: raw.get('refr_urlpath'),
    urlquery: raw.get('refr_urlquery'),
    urlfragment: raw.get('refr_urlfragment')
  }).save(null, {
    transacting: req.trx
  })

}
