const AddDefaultPage = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('websites_websites', (table) => {
      table.integer('home_id').unsigned()
      table.foreign('home_id').references('websites_pages.id')
      table.integer('notfound_id').unsigned()
      table.foreign('notfound_id').references('websites_pages.id')
    })
  },

  down: async (knex) => {
  }

}

export default AddDefaultPage
