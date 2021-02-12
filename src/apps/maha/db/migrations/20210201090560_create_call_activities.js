const CreateCallActivity = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('maha_call_activities', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('call_id').unsigned()
      table.foreign('call_id').references('maha_calls.id')
      table.enum('type', ['answered','hold','unhold','hangup','transfer','forward','machine'], { useNative: true, enumName: 'maha_call_activity_types' })
      table.integer('to_user_id').unsigned()
      table.foreign('to_user_id').references('maha_users.id')
      table.enum('client', ['cell','maha'], { useNative: true, enumName: 'maha_call_activity_clients' })
      table.timestamps()
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_call_activities')
  }

}

export default CreateCallActivity
