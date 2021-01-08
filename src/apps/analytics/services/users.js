import User from '@apps/analytics/models/user'

export const getUser = async(req, { raw }) => {

  const user = await User.query(qb => {
    qb.where('domain_userid', raw.get('domain_userid'))
    qb.where('network_userid', raw.get('network_userid'))
  }).fetch({
    transacting: req.trx
  })

  if(user) {

    if(user.get('user_id') !== raw.get('user_id')) {
      await user.save({
        user_id: raw.get('user_id')
      }, {
        transacting: req.trx,
        patch: true
      })
    }

    return user

  }

  return await User.forge({
    domain_userid: raw.get('domain_userid'),
    network_userid: raw.get('network_userid'),
    user_id: raw.get('user_id')
  }).save(null, {
    transacting: req.trx
  })

}
