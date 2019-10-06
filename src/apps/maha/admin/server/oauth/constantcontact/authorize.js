import qs from 'qs'

const authorize = async (req, { scope, state }) => {

  const query = qs.stringify({
    response_type: 'code',
    client_id: process.env.CONSTANTCONTACT_API_KEY,
    redirect_uri: `${process.env.WEB_HOST}/admin/constantcontact/token`,
    scope: 'account_read+contact_data+campaign_data',
    state
  })

  return `https://api.cc.email/v3/idfed?${query}`

}

export default authorize
