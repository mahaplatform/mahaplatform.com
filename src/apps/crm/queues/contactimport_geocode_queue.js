import MailingAddresses from '../models/mailing_address'
import Queue from '../../../core/objects/queue'
import geocode from '../../maha/services/geocode'

const processor = async (job, trx) => {

  const mailing_address = await MailingAddresses.query(qb => {
    qb.where('id', job.data.id)
  }).fetch({
    transacting: trx
  })

  const address = await geocode(mailing_address.get('address'))

  await mailing_address.save({
    address
  },{
    patch: true,
    transacting: trx
  })

}

const failed = async (job, err) => {}

const ContactImportGeocodeQueue = new Queue({
  name: 'contactimport_geocode',
  enqueue: async (req, job) => job,
  processor,
  failed
})

export default ContactImportGeocodeQueue
