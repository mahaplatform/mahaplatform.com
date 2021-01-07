const CreateNote = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('crm_notes', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.text('text')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_notes')
  }

}

export default CreateNote
