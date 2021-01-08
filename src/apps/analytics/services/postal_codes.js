import PostalCode from '@apps/analytics/models/postal_code'

export const getPostalCode = async(req, data) => {

  const postal_code = await PostalCode.query(qb => {
    qb.where('text', data.text)
  }).fetch({
    transacting: req.trx
  })

  if(postal_code) return postal_code

  return await PostalCode.forge({
    text: data.text
  }).save(null, {
    transacting: req.trx
  })

}
