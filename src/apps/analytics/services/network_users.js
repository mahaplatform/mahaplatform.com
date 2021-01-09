import NetworkUser from '@apps/analytics/models/network_user'

export const getNetworkUser = async(req, { data }) => {

  const network_user = await NetworkUser.query(qb => {
    qb.where('network_userid', data.network_userid)
  }).fetch({
    transacting: req.trx
  })

  if(network_user) return network_user

  return await NetworkUser.forge({
    network_userid: data.network_userid
  }).save(null, {
    transacting: req.trx
  })

}
