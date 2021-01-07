const RecordingCode = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('crm_workflow_recordings', (table) => {
      table.string('code')
      table.integer('duration')
    })

  },

  down: async (knex) => {
  }

}

export default RecordingCode
