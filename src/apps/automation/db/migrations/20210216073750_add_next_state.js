const AddNextState = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('crm_workflow_enrollments', (table) => {
      table.string('next')
      table.jsonb('session')
    })

    await knex('crm_workflow_enrollments').update('session', {})

  },

  down: async (knex) => {
  }

}

export default AddNextState
