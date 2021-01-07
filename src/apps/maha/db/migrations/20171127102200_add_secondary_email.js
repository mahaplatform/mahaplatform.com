const AddSecondaryEmail = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('maha_users', (table) => {
      table.string('secondary_email')
    })

  },

  down: async (knex) => {}

}

export default AddSecondaryEmail
