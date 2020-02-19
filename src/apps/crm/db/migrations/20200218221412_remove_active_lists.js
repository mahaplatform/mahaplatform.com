const RemoveActiveLists = {

  up: async (knex) => {
    await knex.schema.table('crm_lists', (table) => {
      table.dropColumn('type')
      table.dropColumn('criteria')
      table.dropColumn('description')
    })
  },

  down: async (knex) => {
  }

}

export default RemoveActiveLists
