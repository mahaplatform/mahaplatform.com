const SoftDeleteItems = {

  databaseName: 'maha',

  up: async (knex) => {

    await Promise.mapSeries(['list','topic'], async model => {
      await knex.schema.table(`crm_${model}s`, (table) => {
        table.timestamp('deleted_at')
      })
    })

  },

  down: async (knex) => {
  }

}

export default SoftDeleteItems
