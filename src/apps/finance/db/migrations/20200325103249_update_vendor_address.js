const UpdateVendorAddress = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('finance_vendors', (table) => {
      table.jsonb('address')
    })

    const vendors = await knex('finance_vendors')

    await Promise.mapSeries(vendors, async(vendor) => {
      const address = []
      if(vendor.address_1) address.push(vendor.address_1)
      if(vendor.address_2) address.push(vendor.address_2)
      if(vendor.city) address.push(vendor.city)
      if(vendor.state) address.push(vendor.state)
      if(vendor.zip) address.push(vendor.zip)
      address.push('USA')
      await await knex('finance_vendors').where('id', vendor.id).update({
        address: {
          street_1: vendor.address_1,
          street_2: vendor.address_2,
          city: vendor.city,
          state_province: vendor.state,
          postal_code: vendor.zip,
          latitude: null,
          longitude: null,
          description: address.join(', ')
        }
      })
    })

    await knex.schema.table('finance_vendors', (table) => {
      table.dropColumn('address_1')
      table.dropColumn('address_2')
      table.dropColumn('city')
      table.dropColumn('state')
      table.dropColumn('zip')
    })

  },

  down: async (knex) => {
  }

}

export default UpdateVendorAddress
