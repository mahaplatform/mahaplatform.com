import DomainUser from '@apps/analytics/models/domain_user'

export const getDomainUser = async(req, { data, network_user }) => {

  return await DomainUser.fetchOrCreate({
    network_user_id: network_user.get('id'),
    domain_userid: data.domain_userid
  },{
    transacting: req.trx
  })

}
