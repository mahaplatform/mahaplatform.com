import DomainUser from '@apps/analytics/models/domain_user'

const getContactId = ({ data, page_url }) => {
  if(data.user_id) return data.user_id
  if(page_url.qsargs && page_url.qsargs.cid) return page_url.qsargs.cid
  return null
}

export const getDomainUser = async(req, { data, page_url }) => {

  const domain_user = await DomainUser.fetchOrCreate({
    domain_userid: data.domain_userid
  },{
    transacting: req.analytics
  })

  const contact_id = getContactId({ data, page_url })

  if(!data.user_id || domain_user.get('contact_id') === contact_id) return domain_user

  await domain_user.save({
    contact_id
  }, {
    transacting: req.analytics,
    patch: true
  })

  return domain_user

}
