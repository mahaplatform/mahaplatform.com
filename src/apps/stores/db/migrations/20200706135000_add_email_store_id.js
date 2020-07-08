const AddEmailStoreId = {

  up: async (knex) => {
    await knex.schema.table('crm_emails', (table) => {
      table.integer('store_id').unsigned()
      table.foreign('store_id').references('stores_stores.id')
    })
  },

  down: async (knex) => {
  }

}

export default AddEmailStoreId
