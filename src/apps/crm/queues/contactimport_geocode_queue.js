import MailingAddresses from '../models/mailing_address'
import Queue from '../../../core/objects/queue'
import geocode from '../../maha/services/geocode'

const processor = async (req, job) => {

  const mailing_address = await MailingAddresses.query(qb => {
    qb.where('id', job.data.id)
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

const ContactImportGeocodeQueue = new Queue({
  name: 'contactimport_geocode',
  processor
})

export default ContactImportGeocodeQueue
