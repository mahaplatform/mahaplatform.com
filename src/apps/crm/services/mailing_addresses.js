import MailingAddress from '../models/mailing_address'

export const updateMailingAddresses = async (req, { contact, mailing_addresses }) => {

  const add = mailing_addresses.filter(mailing_address => {
    return mailing_address.id === undefined
  })

  const update = mailing_addresses.filter(mailing_address => {
    return mailing_address.id !== undefined
  })

  const remove = contact.related('mailing_addresses').toArray().filter(mailing_address => {
    return mailing_addresses.find(item => {
      return item.id === mailing_address.get('id')
    }) === undefined
  })

  if(add.length > 0) {
    await Promise.mapSeries(add, async (mailing_address) => {
      await MailingAddress.forge({
        team_id: req.team.get('id'),
        contact_id: contact.get('id'),
        address: mailing_address.address,
        is_primary: mailing_address.is_primary
      }).save(null, {
        transacting: req.trx
      })
    })
  }

  if(update.length > 0) {
    await Promise.mapSeries(update, async (mailing_address) => {
      const address = contact.related('mailing_addresses').find(item => {
        return item.get('id') === item.id
      })
      await address.save({
        address: mailing_address.address,
        is_primary: mailing_address.is_primary
      }, {
        transacting: req.trx
      })
    })
  }

  if(remove.length > 0) {
    await Promise.mapSeries(remove, async (mailing_address) => {
      await mailing_address.destroy({
        transacting: req.trx
      })
    })
  }

}
