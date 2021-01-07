import generateCode from '@core/utils/generate_code'

const getFullAddress = (address) => {
  const { street_1, street_2, city, state_province, postal_code } = address
  const parts = [street_1,street_2,city,state_province,postal_code]
  return parts.filter(item => {
    return typeof(item) === 'string' && item.length > 0
  }).join(', ')
}

const normalizeStreet = (street) => {
  if(!street) return street
  return street.split(' ').map(part => {
    if(part === 'North') return 'N'
    if(part === 'East') return 'E'
    if(part === 'South') return 'S'
    if(part === 'West') return 'W'
    return part
  }).join(' ')
}

const FixMailingAddresses = {

  databaseName: 'maha',

  up: async (knex) => {

    const nulls = await knex('crm_mailing_addresses').whereRaw('address->>\'street_1\' like ?', '%null%')

    await Promise.map(nulls, async (address) => {
      await knex('crm_consents').where('mailing_address_id', address.id).del()
      await knex('crm_mailing_addresses').where('id', address.id).del()
    })

    const items = await knex('maha_import_items').whereRaw('maha_import_items.values->>\'address_1_street_1\' is not null').whereNotNull('maha_import_items.object_id')

    await Promise.mapSeries(items, async (item) => {

      const addresses = await knex('crm_mailing_addresses').where('contact_id', item.object_id)
      const exists = addresses.find(address => {
        const address1 = normalizeStreet(address.address.street_1).replace(/[.\s]+/g, '').toLowerCase()
        const address2 = normalizeStreet(item.values.address_1_street_1).replace(/[.\s]+/g, '').toLowerCase()
        return address1.substr(0,8) === address2.substr(0,8)
      }) !== undefined
      if(exists) return

      const address = {
        street_1: normalizeStreet(item.values.address_1_street_1),
        street_2: normalizeStreet(item.values.address_1_street_2),
        city: item.values.address_1_city,
        state_province: item.values.address_1_state_province,
        postal_code: item.values.address_1_postal_code,
        manual: true
      }

      if(address.street_1 === undefined || address.city === undefined || address.state_province === undefined || address.postal_code === undefined ) return

      address.description = getFullAddress(address)

      const contact = await knex('crm_contacts').where('id', item.object_id).then(results => results[0])
      if(!contact) return

      const code = await generateCode({ trx: knex }, {
        table: 'crm_mailing_addresses'
      })

      await knex('crm_mailing_addresses').insert({
        team_id: contact.team_id,
        contact_id: contact.id,
        code,
        address,
        is_primary: addresses.length === 0
      })
    })

  },

  down: async (knex) => {
  }

}

export default FixMailingAddresses
