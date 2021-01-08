import Domain from '@apps/analytics/models/domain'

export const getDomain = async(req, { name }) => {

  const domain = await Domain.query(qb => {
    qb.where('name', name)
  }).fetch({
    transacting: req.trx
  })

  if(domain) return domain

  return await Domain.forge({
    name
  }).save(null, {
    transacting: req.trx
  })

}
