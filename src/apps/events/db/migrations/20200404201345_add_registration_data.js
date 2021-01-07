const AddRegistrationData = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('events_registrations', (table) => {
      table.jsonb('data')
    })
  },

  down: async (knex) => {
  }

}

export default AddRegistrationData
