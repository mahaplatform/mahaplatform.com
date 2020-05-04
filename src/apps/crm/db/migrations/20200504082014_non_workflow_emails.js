const NonWorkflowEmails = {

  up: async (knex) => {
    await knex.schema.table('crm_emails', (table) => {
      table.integer('voice_campaign_id').unsigned()
      table.foreign('voice_campaign_id').references('crm_voice_campaigns.id')
      table.integer('sms_campaign_id').unsigned()
      table.foreign('sms_campaign_id').references('crm_sms_campaigns.id')
    })
  },

  down: async (knex) => {
  }

}

export default NonWorkflowEmails
