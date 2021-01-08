import Region from '@apps/analytics/models/region'

export const getRegion = async(req, data) => {

  const region = await Region.query(qb => {
    qb.where('code', data.code)
    qb.where('text', data.text)
  }).fetch({
    transacting: req.trx
  })

  if(region) return region

  return await Region.forge({
    code: data.code,
    text: data.text
  }).save(null, {
    transacting: req.trx
  })

}
