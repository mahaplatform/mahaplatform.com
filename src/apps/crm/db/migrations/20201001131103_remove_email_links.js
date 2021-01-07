const RemoveEmailLinks = {

  databaseName: 'maha',

  up: async (knex) => {
    await Promise.mapSeries(['crm_forms','events_events'], async model => {
      await knex.schema.table(model, (table) => {
        table.dropColumn('email_id')
      })
    })
  },

  down: async (knex) => {
  }

}

export default RemoveEmailLinks
