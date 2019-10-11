const ExtendEmails = {

  up: async (knex) => {

    await knex.schema.dropTable('maha_email_activities')

    await knex.schema.dropTable('maha_email_links')

    await knex.schema.dropTable('maha_emails')

    await knex.schema.dropTable('maha_email_templates')

    await knex.schema.createTable('maha_emails', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.integer('email_campaign_id').unsigned()
      table.foreign('email_campaign_id').references('crm_email_campaigns.id')
      table.string('code')
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
      table.enum('status', ['queued','sent','failed'], { useNative: true, enumName: 'maha_emails_status' })
      table.boolean('is_mobile')
      table.integer('attempts')
      table.timestamp('sent_at')
      table.timestamps()
    })

    await knex.schema.createTable('maha_email_links', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('email_id').unsigned()
      table.foreign('email_id').references('maha_emails.id')
      table.string('code')
      table.string('text')
      table.string('url')
      table.timestamps()
    })

    await knex.schema.createTable('maha_email_activities', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('email_id').unsigned()
      table.foreign('email_id').references('maha_emails.id')
      table.integer('email_link_id').unsigned()
      table.foreign('email_link_id').references('maha_email_links.id')
      table.enum('type', ['open','click'], { useNative: true, enumName: 'maha_email_activities_type' })
      table.timestamps()
    })

    await knex.schema.table('maha_teams', (table) => {
      table.dropColumn('email_template')
    })

  },

  down: async (knex) => {
  }

}

export default ExtendEmails
