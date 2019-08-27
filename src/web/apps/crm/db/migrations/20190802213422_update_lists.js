const UpdateLists = {

  up: async (knex) => {

    await knex.schema.table('crm_lists', (table) => {
      table.dropColumn('type')
    })

    await knex.schema.table('crm_lists', (table) => {
      table.enum('type', ['static','active'], { useNative: true })
    })

  },

  down: async (knex) => {
  }

}

export default UpdateLists
