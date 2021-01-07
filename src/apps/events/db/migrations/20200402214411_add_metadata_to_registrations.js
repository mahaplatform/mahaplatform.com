const AddMetadataToRegistrations = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('events_registrations', (table) => {
      table.string('ipaddress')
      table.text('referer')
      table.integer('duration')
      table.boolean('is_known')
    })
  },

  down: async (knex) => {
  }

}

export default AddMetadataToRegistrations
