const UpdateEmailActivities = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('maha_email_activities', (table) => {
      table.enum('service', ['facebook','twitter','linkedin','pinterest'], { useNative: true, enumName: 'maha_email_activities_service' })
    })
  },

  down: async (knex) => {
  }

}

export default UpdateEmailActivities
