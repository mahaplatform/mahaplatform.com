const UpdateSmsCampaigns = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('crm_sms_campaigns', (table) => {
      table.dropColumn('steps')
      table.jsonb('to')
      table.jsonb('config')
    })
  },

  down: async (knex) => {
  }

}

export default UpdateSmsCampaigns
