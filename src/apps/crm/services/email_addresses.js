import EmailAddress from '../models/email_address'

export const updateEmailAddresses = async (req, { contact, email_addresses }) => {

  const add = email_addresses.filter(email_address => {
    return email_address.id === undefined
  })

  const update = email_addresses.filter(email_address => {
    return email_address.id !== undefined
  })

  const remove = contact.related('email_addresses').toArray().filter(email_address => {
    return email_addresses.find(address => {
      return address.id === email_address.get('id')
    }) === undefined
  })

  if(add.length > 0) {
    await Promise.mapSeries(add, async (email_address) => {
      await EmailAddress.forge({
        team_id: req.team.get('id'),
        contact_id: contact.get('id'),
        address: email_address.address,
        is_primary: email_address.is_primary,
        is_valid: true
      }).save(null, {
        transacting: req.trx
      })
    })
  }

  if(update.length > 0) {
    await Promise.mapSeries(update, async (email_address) => {
      const address = contact.related('email_addresses').find(item => {
        return item.get('id') === email_address.id
      })
      await address.save({
        address: email_address.address,
        is_primary: email_address.is_primary
      }, {
        transacting: req.trx
      })
    })
  }

  if(remove.length > 0) {
    await Promise.mapSeries(remove, async (email_address) => {
      await email_address.destroy({
        transacting: req.trx
      })
    })
  }

}
