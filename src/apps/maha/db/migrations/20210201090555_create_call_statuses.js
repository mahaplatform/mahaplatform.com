const CreateCallStatus = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('maha_call_statuses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('call_connection_id').unsigned()
      table.foreign('call_connection_id').references('maha_call_connections.id')
      table.enum('status', ['queued','initiated','ringing','in-progress','completed','failed','canceled','no-answer','busy'], { useNative: true, enumName: 'maha_call_status_statuses' })
      table.timestamp('tstamp')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_call_statuses')
  }

}

export default CreateCallStatus
