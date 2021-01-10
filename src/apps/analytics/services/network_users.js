import NetworkUser from '@apps/analytics/models/network_user'
import Contact from '@apps/analytics/models/contact'

export const getNetworkUser = async(req, { data }) => {

  const network_user = await NetworkUser.fetchOrCreate({
    network_userid: data.network_userid
  },{
    transacting: req.trx
  })

  if(data.user_id) {
    await Contact.fetchOrCreate({
      network_user_id: network_user.get('id'),
      contact_id: data.user_id
    }, {
      transacting: req.trx
    })
  }

  return network_user

}
