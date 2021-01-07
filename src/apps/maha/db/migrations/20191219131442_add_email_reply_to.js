const AddEmailReplyTo = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('maha_emails', (table) => {
      table.string('reply_to')
    })

  },

  down: async (knex) => {
  }

}

export default AddEmailReplyTo
