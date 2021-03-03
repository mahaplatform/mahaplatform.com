const CreateIndexes = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.alterTable('maha_devices', function(table) {
      table.index('fingerprint')
    })

  },

  down: async (knex) => {
  }

}

export default CreateIndexes
