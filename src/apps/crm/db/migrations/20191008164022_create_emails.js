const CreateEmailCampaignDelivery = {

  up: async (knex) => {
    await knex.schema.createTable('crm_emails', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
      table.string('emailable_type')
      table.integer('emailable_id')
      table.string('ses_id')
      table.string('bounce_type')
      table.string('bounce_subtype')
      table.string('complaint_type')
      table.string('error')
      table.boolean('was_delivered')
      table.boolean('was_bounced')
      table.boolean('was_opened')
      table.boolean('was_clicked')
      table.boolean('was_complained')
      table.boolean('was_unsubscribed')
      table.boolean('is_mobile')
      table.integer('attempts')
      table.timestamp('sent_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_emails')
  }

}

export default CreateEmailCampaignDelivery
