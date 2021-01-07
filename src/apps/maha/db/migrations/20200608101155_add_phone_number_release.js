const AddPhoneNumberRelease = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('maha_phone_numbers', (table) => {
      table.timestamp('released_at')
    })

  },

  down: async (knex) => {
  }

}

export default AddPhoneNumberRelease
