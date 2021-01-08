import Medium from '@apps/analytics/models/medium'

export const getMedium = async(req, data) => {

  const medium = await Medium.query(qb => {
    qb.where('text', data.mkt_source)
  }).fetch({
    transacting: req.trx
  })

  if(medium) return medium

  return await Medium.forge({
    text: data.mkt_source
  }).save(null, {
    transacting: req.trx
  })

}
