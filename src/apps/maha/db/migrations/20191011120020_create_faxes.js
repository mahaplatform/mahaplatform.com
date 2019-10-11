const CreateFax = {

  up: async (knex) => {

    await knex('maha_sources').insert({
      text: 'fax'
    })

    await knex.schema.createTable('maha_faxes', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('number_id').unsigned()
      table.foreign('number_id').references('maha_numbers.id')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
      table.string('to')
      table.string('from')
      table.enum('type', ['inbound','outbound'], { useNative: true, enumName: 'maha_faxes_type' })
      table.integer('num_pages')
      table.string('sid')
      table.enum('status', ['pending','queued','no-answer','busy','failed','answering_machine','hangup','sent','receiving','received'], { useNative: true, enumName: 'maha_faxes_status' })
      table.timestamp('received_at')
      table.timestamp('sent_at')
      table.timestamps()
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_faxes')
  }

}

export default CreateFax
