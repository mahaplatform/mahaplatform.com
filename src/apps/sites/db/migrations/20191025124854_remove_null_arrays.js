import _ from 'lodash'

const RemoveNullArrays = {

  databaseName: 'maha',

  up: async (knex) => {

    const items = await knex('sites_items')

    await Promise.mapSeries(items, async (item) => {
      const values = Object.keys(item.values).reduce((values, key) => {
        const value = _.castArray(item.values[key]).filter(item => item !== null)
        return {
          ...values,
          [key]: value
        }
      }, {})
      await knex('sites_items').where({
        id: item.id
      }).update({
        values
      })
    })

  },

  down: async (knex) => {
  }

}

export default RemoveNullArrays
