const CreateSms = {

  up: async (knex) => {

    await knex.schema.createTable('maha_smses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('from_id').unsigned()
      table.foreign('from_id').references('maha_numbers.id')
      table.integer('to_id').unsigned()
      table.foreign('to_id').references('maha_numbers.id')
      table.enum('direction', ['inbound','outbound'], { useNative: true, enumName: 'maha_smses_direction' })
      table.integer('num_media')
      table.text('body')
      table.string('sid')
      table.enum('status', ['accepted','queued','sending','sent','failed','delivered','undelivered','receiving','received'], { useNative: true, enumName: 'maha_smses_status' })
      table.decimal('price', 5, 4)
      table.timestamp('received_at')
      table.timestamp('sent_at')
      table.timestamps()
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_smses')
  }

}

export default CreateSms
