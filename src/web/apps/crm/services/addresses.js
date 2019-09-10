import Address from '../models/address'

export const updateAddresses = async (req, { contact, addresses }) => {

  const add = addresses.filter(address => {
    return address.id === undefined
  })

  const update = addresses.filter(address => {
    return address.id !== undefined
  })

  const remove = contact.related('addresses').toArray().filter(address => {
    return addresses.find(item => {
      return item.id === address.get('id')
    }) === undefined
  })

  if(add.length > 0) {
    await Promise.mapSeries(add, async (item) => {
      await Address.forge({
        team_id: req.team.get('id'),
        contact_id: contact.get('id'),
        address: item.address,
        is_primary: item.is_primary
      }).save(null, {
        transacting: req.trx
      })
    })
  }

  if(update.length > 0) {
    await Promise.mapSeries(update, async (item) => {
      const address = contact.related('addresses').find(item => {
        return item.get('id') === item.id
      })
      await address.save({
        address: item.address,
        is_primary: item.is_primary
      }, {
        transacting: req.trx
      })
    })
  }

  if(remove.length > 0) {
    await Promise.mapSeries(remove, async (item) => {
      await item.destroy({
        transacting: req.trx
      })
    })
  }

}
