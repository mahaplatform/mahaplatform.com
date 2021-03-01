const CreateResponse = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('datasets_responses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('type_id').unsigned()
      table.foreign('type_id').references('datasets_types.id')
      table.integer('record_id').unsigned()
      table.foreign('record_id').references('datasets_records.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.jsonb('values')
      table.enum('status', ['pending','rejected','accepted'], { useNative: true, enumName: 'datasets_response_statuses' })
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('datasets_responses')
  }

}

export default CreateResponse
