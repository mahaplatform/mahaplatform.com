const AddIntegrationToVendor = {

  up: async (knex) => {

    await knex.schema.table('expenses_vendors', (table) => {
      table.jsonb('integration')
    })

  },

  down: async (knex) => {

    await knex.schema.table('expenses_vendors', (table) => {
      table.removeColumn('integration')
    })

  }

}

export default AddIntegrationToVendor
