const AddSessionEmailCampaign = {

  databaseName: 'analytics',

  up: async (knex) => {

    await knex.schema.table('sessions', (table) => {
      table.integer('email_campaign_id')
    })

  },

  down: async (knex) => {
  }

}

export default AddSessionEmailCampaign
