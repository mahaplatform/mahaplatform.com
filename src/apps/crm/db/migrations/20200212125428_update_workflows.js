const UpdateWorkflows = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('crm_workflows', (table) => {
      table.integer('email_campaign_id').unsigned()
      table.foreign('email_campaign_id').references('crm_email_campaigns.id')
    })
  },

  down: async (knex) => {
  }

}

export default UpdateWorkflows
