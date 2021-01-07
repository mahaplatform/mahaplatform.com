const CreateCall = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('crm_calls', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.date('date')
      table.time('time')
      table.text('description')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_calls')
  }

}

export default CreateCall
