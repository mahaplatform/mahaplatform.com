import DomainUser from '@analytics/models/domain_user'

export const getDomainUser = async(req, { enriched }) => {

  const domain_user = await DomainUser.fetchOrCreate({
    domain_userid: enriched.domain_userid
  },{
    transacting: req.analytics
  })

  if(!enriched.user_id || domain_user.get('contact_id') === enriched.user_id) return domain_user

  await domain_user.save({
    contact_id: enriched.user_id
  }, {
    transacting: req.analytics,
    patch: true
  })

  return domain_user

}
