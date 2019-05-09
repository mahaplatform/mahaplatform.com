import Migration from '../../../../core/objects/migration'

const AlterMembers = new Migration({

  up: async (knex) => {

    await knex.schema.table('sites_members', (table) => {
      table.dropColumn('first_name')
      table.dropColumn('last_name')
      table.dropColumn('email')
    })

  },

  down: async (knex) => {

    await knex.schema.table('sites_members', (table) => {
      table.string('first_name')
      table.string('last_name')
      table.string('email')
    })

  }

})

export default AlterMembers
