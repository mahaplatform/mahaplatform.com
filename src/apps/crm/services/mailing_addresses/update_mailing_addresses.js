import GeocodeMailingAddressQueue from '../../queues/geocode_mailing_address_queue'
import generateCode from '../../../../core/utils/generate_code'
import MailingAddress from '../../models/mailing_address'
import moment from 'moment'

const updateMailingAddresses = async (req, { contact, mailing_addresses, removing, geocode }) => {

  await contact.load(['mailing_addresses'], {
    transacting: req.trx
  })

  const existing = contact.related('mailing_addresses').toArray()

  const getIsPrimary = (mailing_address, existing, found) => {
    if(mailing_address.is_primary !== undefined) return mailing_address.is_primary
    if(found && found.get('is_primary')) return true
    return existing.length === 0
  }

  mailing_addresses = mailing_addresses.map(mailing_address => {
    const found = existing.find(address => {
      return address.get('address').street_1 === mailing_address.address.street_1
    })
    return {
      ...mailing_address,
      is_primary: getIsPrimary(mailing_address, existing, found),
      id: found ? found.get('id') : undefined
    }
  })

  const add = mailing_addresses.filter(mailing_address => {
    return mailing_address.id === undefined
  })

  const update = mailing_addresses.filter(mailing_address => {
    return mailing_address.id !== undefined
  })

  const remove = removing !== false ? existing.filter(mailing_address => {
    return mailing_addresses.find(item => {
      return item.id === mailing_address.get('id')
    }) === undefined
  }) : []

  const added = await Promise.mapSeries(add, async (mailing_address) => {

    const code = await generateCode(req, {
      table: 'crm_mailing_addresses'
    })

    const address = await MailingAddress.forge({
      team_id: req.team.get('id'),
      contact_id: contact.get('id'),
      code,
      address: mailing_address.address,
      is_primary: mailing_address.is_primary
    }).save(null, {
      transacting: req.trx
    })

    if(mailing_address.address.latitude) return address

    if(geocode === false) return address

    await GeocodeMailingAddressQueue.enqueue(req, {
      mailing_address_id: address.id
    })

    return address

  })

  const updated = await Promise.mapSeries(update, async (mailing_address) => {

    const address = contact.related('mailing_addresses').find(item => {
      return item.get('id') === mailing_address.id
    })

    await address.save({
      address: mailing_address.address,
      is_primary: mailing_address.is_primary
    }, {
      transacting: req.trx,
      patch: true
    })

    if(mailing_address.address.latitude) return address

    if(geocode === false) return address

    await GeocodeMailingAddressQueue.enqueue(req, {
      mailing_address_id: address.id
    })

    return address

  })

  if(remove.length > 0) {
    await Promise.mapSeries(remove, async (mailing_address) => {
      await mailing_address.save({
        is_primary: false,
        deleted_at: moment()
      },{
        transacting: req.trx,
        patch: true
      })
    })
  }

  return [
    ...added,
    ...updated
  ]

}

export default updateMailingAddresses
