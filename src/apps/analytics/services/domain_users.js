import DomainUser from '@apps/analytics/models/domain_user'

export const getDomainUser = async(req, { data, network_user }) => {

  const domain_user = await DomainUser.query(qb => {
    qb.where('domain_userid', data.domain_userid)
  }).fetch({
    transacting: req.trx
  })

  if(domain_user) return domain_user

  return await DomainUser.forge({
    network_user_id: network_user.get('id'),
    domain_userid: data.domain_userid
  }).save(null, {
    transacting: req.trx
  })

}
