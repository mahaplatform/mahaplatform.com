import City from '@apps/analytics/models/city'

export const getCity = async(req, data) => {

  const city = await City.query(qb => {
    qb.where('text', data.text)
  }).fetch({
    transacting: req.trx
  })

  if(city) return city

  return await City.forge({
    text: data.text
  }).save(null, {
    transacting: req.trx
  })

}
