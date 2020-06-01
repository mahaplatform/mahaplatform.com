import generateCode from '../../../core/utils/generate_code'
import EmailAddress from '../models/email_address'

export const updateEmailAddresses = async (req, { contact, email_addresses, removing }) => {

  await contact.load(['email_addresses'], {
    transacting: req.trx
  })

  const existing = contact.related('email_addresses').toArray()

  const getIsPrimary = (email_address, existing, found) => {
    if(email_address.is_primary !== undefined) return email_address.is_primary
    if(found && found.get('is_primary')) return true
    return existing.length === 0
  }

  email_addresses = email_addresses.map(email_address => {
    const found = existing.find(address => {
      return address.get('address') === email_address.address.toLowerCase()
    })
    return {
      ...email_address,
      is_primary: getIsPrimary(email_address, existing, found),
      id: found ? found.get('id') : undefined
    }
  })

  const add = email_addresses.filter(email_address => {
    return email_address.id === undefined
  })

  const update = email_addresses.filter(email_address => {
    return email_address.id !== undefined
  })

  const remove = removing !== false ? existing.filter(email_address => {
    return email_addresses.find(address => {
      return address.id === email_address.get('id')
    }) === undefined
  }) : []

  const added = add.length > 0 ? await Promise.mapSeries(add, async (email_address) => {
    const code = await generateCode(req, {
      table: 'crm_email_addresses'
    })
    return await EmailAddress.forge({
      team_id: req.team.get('id'),
      contact_id: contact.get('id'),
      code,
      address: email_address.address.toLowerCase(),
      is_primary: email_address.is_primary,
      is_valid: true
    }).save(null, {
      transacting: req.trx
    })
  }) : []

  const updated = update.length > 0 ? await Promise.mapSeries(update, async (email_address) => {
    const address = contact.related('email_addresses').find(item => {
      return item.get('id') === email_address.id
    })
    return await address.save({
      address: email_address.address.toLowerCase(),
      is_primary: email_address.is_primary
    }, {
      transacting: req.trx
    })
  }) : []

  if(remove.length > 0) {
    await Promise.mapSeries(remove, async (email_address) => {
      await email_address.destroy({
        transacting: req.trx
      })
    })
  }

  return [
    ...added,
    ...updated
  ]

}
