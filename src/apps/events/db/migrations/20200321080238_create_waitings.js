const CreateWaiting = {

  up: async (knex) => {
    await knex.schema.createTable('events_waitings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.integer('num_tickets')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('events_waitings')
  }

}

export default CreateWaiting
