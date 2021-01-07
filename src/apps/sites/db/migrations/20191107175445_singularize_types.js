import pluralize from 'pluralize'

const SingularizeTypes = {

  databaseName: 'maha',

  up: async (knex) => {

    const types = await knex('sites_types')

    await Promise.mapSeries(types, async(type) => {

      await knex('sites_types').where({
        id: type.id
      }).update({
        name: pluralize.singular(type.title).toLowerCase()
      })

    })

  },

  down: async (knex) => {
  }

}

export default SingularizeTypes
