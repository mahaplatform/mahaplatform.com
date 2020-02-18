const AddForwardToEmailActivity = {

  up: async (knex) => {
    await knex.schema.table('maha_email_activities', (table) => {
      table.string('forwarded_to')
    })

  },

  down: async (knex) => {
  }

}

export default AddForwardToEmailActivity
