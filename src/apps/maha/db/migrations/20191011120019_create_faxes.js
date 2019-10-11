const CreateFax = {

  up: async (knex) => {
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
      table.enum('type', ['incoming','outgoing'], { useNative: true, enumName: 'maha_faxes_type' })
      table.integer('numPages')
      table.string('sid')
      table.enum('status', ['queued','no-answer','busy','failed','answering_machine','hangup','completed'], { useNative: true, enumName: 'maha_faxes_status' })
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
