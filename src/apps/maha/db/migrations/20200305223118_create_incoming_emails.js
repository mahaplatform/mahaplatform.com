const CreateIncomingEmail = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('maha_incoming_emails', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.string('from')
      table.string('to')
      table.timestamp('date')
      table.text('subject')
      table.text('html')
      table.text('text')
      table.timestamps()
    })

    await knex.schema.createTable('maha_incoming_email_attachments', (table) => {
      table.integer('incoming_email_id').unsigned()
      table.foreign('incoming_email_id').references('maha_incoming_emails.id')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_incoming_emails')
  }

}

export default CreateIncomingEmail
