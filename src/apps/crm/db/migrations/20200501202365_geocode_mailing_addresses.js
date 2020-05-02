import GeocodeMailingAddressQueue from '../../queues/geocode_mailing_address_queue'
import MailingAddress from '../../models/mailing_address'

const GeocodeMailingAddresses = {

  up: async (knex) => {

    const addresses = await MailingAddress.query(qb => {
      qb.whereRaw('address is not null and address->>\'latitude\' is null')
    }).fetchAll({
      withRelated: ['team'],
      transacting: knex
    })

    await Promise.mapSeries(addresses, async (address) => {
      await GeocodeMailingAddressQueue.enqueue({
        trx: knex,
        team: address.get('team')
      }, {
        mailing_address_id: address.get('id')
      })
    })
  },

  down: async (knex) => {
  }

}

export default GeocodeMailingAddresses
