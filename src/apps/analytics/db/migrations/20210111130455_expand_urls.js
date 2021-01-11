const ExpandUrls = {

  databaseName: 'analytics',

  up: async (knex) => {

    await knex.schema.table('pages', (table) => {
      table.text('path').alter()
    })

    await knex.schema.table('referers', (table) => {
      table.text('path').alter()
    })

  },

  down: async (knex) => {
  }

}

export default ExpandUrls
