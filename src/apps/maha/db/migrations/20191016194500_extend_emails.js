const ExtendEmails = {

  up: async (knex) => {

    await knex.schema.table('maha_emails', (table) => {
      table.dropColumn('bounce_type')
      table.dropColumn('bounce_subtype')
      table.dropColumn('complaint_type')
      table.dropColumn('status')
      table.dropColumn('text')
    })

    await knex.schema.table('maha_emails', (table) => {
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.integer('email_campaign_id').unsigned()
      table.foreign('email_campaign_id').references('crm_email_campaigns.id')
      table.enum('bounce_type', ['Undetermined','Permanent','Transient'], { useNative: true, enumName: 'maha_emails_bounce_type' })
      table.enum('bounce_subtype', ['Undetermined','General','NoEmail','Suppressed','MailboxFull','MessageTooLarge','ContentRejected','AttachmentRejected'], { useNative: true, enumName: 'maha_emails_bounce_subtype' })
      table.enum('complaint_type', ['abuse','auth-failure','fraud','not-spam','other','virus'], { useNative: true, enumName: 'maha_emails_complaint_type' })
      table.boolean('was_clicked')
      table.boolean('was_unsubscribed')
      table.enum('direction', ['inbound','outbound'], { useNative: true, enumName: 'maha_emails_direction' })
      table.enum('status', ['queued','sent','failed'], { useNative: true, enumName: 'maha_emails_status' })
      table.boolean('is_mobile')
    })

    await knex('maha_emails').update({
      direction: 'outbound'
    })

    const activities = await knex('maha_email_activities')

    await knex.schema.table('maha_email_activities', (table) => {
      table.dropColumn('type')
    })

    await knex.schema.table('maha_email_activities', (table) => {
      table.enum('type', ['open','click'], { useNative: true, enumName: 'maha_email_activities_type' })
    })

    await Promise.mapSeries(activities, async (activity) => {
      await knex('maha_email_activities').where({
        id: activity.id
      }).update({
        type: activity.type
      })
    })

    await knex.schema.table('maha_teams', (table) => {
      table.dropColumn('email_template')
    })

  },

  down: async (knex) => {
  }

}

export default ExtendEmails
