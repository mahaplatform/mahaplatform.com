import MailingAddresses from '../../models/mailing_address'
import geocode from '../../../maha/services/geocode'

const geocodeMailingAddress = async (req, { mailing_address_id }) => {

  const mailing_address = await MailingAddresses.query(qb => {
    qb.where('id', mailing_address_id)
  }).fetch({
    transacting: req.trx
  })

  const address = await geocode(mailing_address.get('address'))

  if(!address) return

  await mailing_address.save({
    address
  },{
    patch: true,
    transacting: req.trx
  })

}

export default geocodeMailingAddress
