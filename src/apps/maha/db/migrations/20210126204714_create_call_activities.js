const CreateCallActivity = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('maha_call_activities', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('call_id').unsigned()
      table.foreign('call_id').references('maha_calls.id')
      table.jsonb('data')
      table.timestamp('tstamp')
    })

    await knex.schema.table('maha_calls', (table) => {
      table.dropColumn('body')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_call_activities')
  }

}

export default CreateCallActivity
