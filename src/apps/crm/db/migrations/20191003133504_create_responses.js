const CreateResponse = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('crm_responses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('form_id').unsigned()
      table.foreign('form_id').references('crm_forms.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.string('ipaddress')
      table.jsonb('data')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_responses')
  }

}

export default CreateResponse
