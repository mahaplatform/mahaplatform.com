const UpdateContactEmails = {

  up: async (knex) => {

    await knex.schema.table('crm_contact_emails', (table) => {
      table.dropColumn('subject')
      table.dropColumn('html')
      table.jsonb('data')
    })

  },

  down: async (knex) => {
  }

}

export default UpdateContactEmails
