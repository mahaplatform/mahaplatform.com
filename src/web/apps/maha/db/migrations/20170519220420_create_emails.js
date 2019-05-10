const CreateEmails = {

  up: async (knex) => {
    return await knex.schema.createTable('maha_emails', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.string('code')
      table.string('to')
      table.string('cc')
      table.string('bcc')
      table.string('subject')
      table.string('status')
      table.string('ses_id')
      table.string('bounce_type')
      table.string('bounce_subtype')
      table.string('complaint_type')
      table.text('html')
      table.text('text')
      table.string('error')
      table.boolean('was_delivered').defaultTo('false')
      table.boolean('was_opened').defaultTo('false')
      table.boolean('was_bounced').defaultTo('false')
      table.boolean('was_complained').defaultTo('false')
      table.integer('attempts').defaultTo(0)
      table.timestamp('sent_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_emails')
  }

}

export default CreateEmails
