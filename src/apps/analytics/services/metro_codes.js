import MetroCode from '@apps/analytics/models/metro_code'

export const getMetroCode = async(req, data) => {

  const metro_code = await MetroCode.query(qb => {
    qb.where('text', data.text)
  }).fetch({
    transacting: req.trx
  })

  if(metro_code) return metro_code

  return await MetroCode.forge({
    text: data.text
  }).save(null, {
    transacting: req.trx
  })

}
