import _ from 'lodash'

const UpdateAddresses = {

  databaseName: 'maha',

  up: async (knex) => {

    const fields = await knex('maha_fields').where('type','addressfield').where('parent_type', 'sites_types')

    await Promise.mapSeries(fields, async (field) => {

      const items = await knex('sites_items').where({
        type_id: field.parent_id
      })

      await Promise.mapSeries(items, async (item) => {

        if(!item.values[field.code][0]) return

        const { street1, street2, city, province, postalcode, county, country, latitude, longitude } = item.values[field.code][0]

        await knex('sites_items').where({
          id: item.id
        }).update({
          values: {
            ...item.values,
            [field.code]: [
              {
                description: [street1,street2,city,province,postalcode].filter(item => typeof(item) === 'string' && item.length > 0).join(', '),
                street_1: street1,
                street_2: street2,
                city,
                state_province: province,
                postal_code: postalcode,
                county,
                country,
                latitude,
                longitude
              }
            ]
          }
        })

      })

    })

  },

  down: async (knex) => {
  }

}

export default UpdateAddresses
