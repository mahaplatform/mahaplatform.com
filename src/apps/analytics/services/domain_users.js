import DomainUser from '@apps/analytics/models/domain_user'

export const getDomainUser = async(req, { data }) => {

  const domain_user = await DomainUser.fetchOrCreate({
    domain_userid: data.domain_userid
  },{
    transacting: req.analytics
  })

  if(!data.user_id || domain_user.get('contact_id') === data.user_id) return domain_user

  await domain_user.save({
    contact_id: data.user_id
  }, {
    transacting: req.analytics,
    patch: true
  })

  return domain_user

}
