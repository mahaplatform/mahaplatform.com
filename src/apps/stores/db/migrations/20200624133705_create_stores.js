const CreateStore = {

  up: async (knex) => {

    await knex.schema.createTable('stores_stores', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
      table.integer('workflow_id').unsigned()
      table.foreign('workflow_id').references('crm_workflows.id')
      table.string('code')
      table.string('title')
      table.string('permalink')
      table.timestamp('deleted_at')
      table.timestamps()
    })
    await knex.schema.table('crm_workflows', (table) => {
      table.integer('store_id').unsigned()
      table.foreign('store_id').references('stores_stores.id')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('stores_stores')
  }

}

export default CreateStore
