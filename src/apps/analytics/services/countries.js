import Country from '@apps/analytics/models/country'

export const getCountry = async(req, data) => {

  const country = await Country.query(qb => {
    qb.where('code', data.code)
    qb.where('text', data.text)
  }).fetch({
    transacting: req.trx
  })

  if(country) return country

  return await Country.forge({
    code: data.code,
    text: data.text
  }).save(null, {
    transacting: req.trx
  })

}
