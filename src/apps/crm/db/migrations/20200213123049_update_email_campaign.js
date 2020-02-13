const UpdateEmailCampaign = {

  up: async (knex) => {
    await knex.schema.table('crm_email_campaigns', (table) => {
      table.integer('job_id')
    })
  },

  down: async (knex) => {
  }

}

export default UpdateEmailCampaign
