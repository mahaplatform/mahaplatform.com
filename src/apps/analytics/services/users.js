import User from '@apps/analytics/models/user'

export const getUser = async(req, { data }) => {

  const user = await User.query(qb => {
    qb.where('domain_userid', data.domain_userid)
    qb.where('network_userid', data.network_userid)
  }).fetch({
    transacting: req.trx
  })

  if(user) {

    if(user.get('user_id') !== data.user_id) {
      await user.save({
        user_id: data.user_id
      }, {
        transacting: req.trx,
        patch: true
      })
    }

    return user

  }

  return await User.forge({
    domain_userid: data.domain_userid,
    network_userid: data.network_userid,
    user_id: data.user_id
  }).save(null, {
    transacting: req.trx
  })

}
