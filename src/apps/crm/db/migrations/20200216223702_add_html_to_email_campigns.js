const AddHtmlToEmailCampigns = {

  up: async (knex) => {
    await knex.schema.table('crm_email_campaigns', (table) => {
      table.text('html')
    })
    await knex.schema.table('maha_emails', (table) => {
      table.jsonb('data')
    })
  },

  down: async (knex) => {
  }

}

export default AddHtmlToEmailCampigns
