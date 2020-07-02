const AddContactConfig = {

  up: async (knex) => {
    await knex.schema.table('stores_stores', (table) => {
      table.jsonb('contact_config')
    })
  },

  down: async (knex) => {
  }

}

export default AddContactConfig
