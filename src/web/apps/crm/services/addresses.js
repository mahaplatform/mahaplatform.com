import Address from '../models/address'

export const updateAddresses = async (req, { contact, addresses }) => {

  const add = addresses.filter(address => {
    return address.id === undefined
  })

  const update = addresses.filter(address => {
    return address.id !== undefined
  })

  const remove = contact.related('addresses').toArray().filter(address => {
    return addresses.find(number => {
      return number.id === address.get('id')
    }) === undefined
  })

  if(add.length > 0) {
    await Promise.mapSeries(add, async (address) => {
      await Address.forge({
        team_id: req.team.get('id'),
        contact_id: contact.get('id'),
        address: address.address,
        is_primary: address.is_primary
      }).save(null, {
        transacting: req.trx
      })
    })
  }

  if(update.length > 0) {
    await Promise.mapSeries(update, async (address) => {
      const number = contact.related('addresses').find(item => {
        return item.get('id') === address.id
      })
      await number.save({
        address: address.address,
        is_primary: address.is_primary
      }, {
        transacting: req.trx
      })
    })
  }

  if(remove.length > 0) {
    await Promise.mapSeries(remove, async (address) => {
      await address.destroy({
        transacting: req.trx
      })
    })
  }

}
