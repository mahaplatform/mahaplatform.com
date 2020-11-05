import { geocodeMailingAddress } from '../services/mailing_addresses'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  await geocodeMailingAddress(req, {
    mailing_address_id: job.data.mailing_address_id
  })

}

const GeocodeMailingAddressQueue = new Queue({
  name: 'geocode_mailing_address',
  processor
})

export default GeocodeMailingAddressQueue
