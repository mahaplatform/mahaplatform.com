const CreateCall = {

  up: async (knex) => {
    await knex.schema.createTable('maha_calls', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('from_id').unsigned()
      table.foreign('from_id').references('maha_numbers.id')
      table.integer('to_id').unsigned()
      table.foreign('to_id').references('maha_numbers.id')
      table.enum('type', ['incoming','outgoing'], { useNative: true, enumName: 'maha_calls_type' })
      table.text('body')
      table.string('sid')
      table.enum('status', ['pending','queued','no-answer','busy','failed','answering_machine','hangup','completed'], { useNative: true, enumName: 'maha_calls_status' })
      table.decimal('price', 5, 4)
      table.timestamp('received_at')
      table.timestamp('sent_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('calls')
  }

}

export default CreateCall
