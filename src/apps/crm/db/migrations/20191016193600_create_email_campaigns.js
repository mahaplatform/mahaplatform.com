const CreateEmailCampaign = {

  up: async (knex) => {
    await knex.schema.createTable('crm_email_campaigns', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
      table.integer('sender_id').unsigned()
      table.foreign('sender_id').references('crm_senders.id')
      table.enum('status', ['draft','scheduled','sent'], { useNative: true, enumName: 'crm_email_campaigns_status' })
      table.string('title')
      table.string('code')
      table.string('subject')
      table.string('reply_to')
      table.jsonb('to')
      table.jsonb('config')
      table.timestamp('send_at')
      table.timestamp('sent_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_email_campaigns')
  }

}

export default CreateEmailCampaign
