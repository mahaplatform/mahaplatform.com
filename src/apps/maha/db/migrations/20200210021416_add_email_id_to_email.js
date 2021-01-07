const AddEmailIdToEmail = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('maha_emails', (table) => {
      table.integer('email_id').unsigned()
      table.foreign('email_id').references('crm_emails.id')
      table.timestamp('delivered_at')
      table.timestamp('opened_at')
      table.timestamp('bounced_at')
      table.timestamp('complained_at')
      table.timestamp('clicked_at')
    })
  },

  down: async (knex) => {
  }

}

export default AddEmailIdToEmail
