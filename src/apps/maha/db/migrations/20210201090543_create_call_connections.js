const CreateCallConnection = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('maha_call_connections', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('call_id').unsigned()
      table.foreign('call_id').references('maha_calls.id')
      table.integer('from_number_id').unsigned()
      table.foreign('from_number_id').references('maha_numbers.id')
      table.integer('to_number_id').unsigned()
      table.foreign('to_number_id').references('maha_numbers.id')
      table.integer('from_program_id').unsigned()
      table.foreign('from_program_id').references('crm_programs.id')
      table.integer('to_program_id').unsigned()
      table.foreign('to_program_id').references('crm_programs.id')
      table.integer('from_user_id').unsigned()
      table.foreign('from_user_id').references('maha_users.id')
      table.integer('to_user_id').unsigned()
      table.foreign('to_user_id').references('maha_users.id')
      table.integer('from_phone_number_id').unsigned()
      table.foreign('from_phone_number_id').references('crm_phone_numbers.id')
      table.integer('to_phone_number_id').unsigned()
      table.foreign('to_phone_number_id').references('crm_phone_numbers.id')
      table.string('sid')
      table.enum('direction', ['inbound','outbound','outbound-dial','outbound-api'], { useNative: true, enumName: 'maha_call_connection_directions' })
      table.enum('status', ['initiated','ringing','in-progress','completed','failed','canceled','no-answer','busy'], { useNative: true, enumName: 'maha_call_connection_statuses' })
      table.integer('duration')
      table.decimal('price', 4, 3)
      table.timestamp('started_at')
      table.timestamp('ended_at')
    })

    await knex('maha_calls').whereNotIn('status', ['no-answer','busy','failed','completed']).update('status', 'completed')
    await knex('maha_calls').whereNull('status').update('status', 'completed')

    const calls = await knex('maha_calls')

    await Promise.mapSeries(calls, async (call) => {

      await knex('maha_calls').where('id', call.id).update({
        direction: call.direction === 'inbound' ? 'inbound' : 'outbound'
      })

      await knex('maha_call_connections').insert({
        team_id: call.team_id,
        call_id: call.id,
        from_number_id: call.from_number_id,
        to_number_id: call.to_number_id,
        from_user_id: call.from_user_id,
        to_user_id: call.to_user_id,
        from_program_id: call.direction === 'inbound' ? call.program_id : null,
        to_program_id: call.direction === 'outbound' ? call.program_id : null,
        from_phone_number_id: call.direction === 'inbound' ? call.phone_number_id : null,
        to_phone_number_id: call.direction === 'outbound' ? call.phone_number_id : null,
        sid: call.sid,
        direction: call.direction === 'inbound' ? 'inbound' : 'outbound',
        status: call.status,
        duration: call.duration,
        price: call.price,
        started_at: call.created_at,
        ended_at: call.created_at
      })

    })

    await knex.schema.table('maha_calls', (table) => {
      table.dropColumn('user_id')
      table.dropColumn('from_user_id')
      table.dropColumn('to_user_id')
      table.dropColumn('body')
      table.dropColumn('duration')
      table.dropColumn('price')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_call_connections')
  }

}

export default CreateCallConnection
