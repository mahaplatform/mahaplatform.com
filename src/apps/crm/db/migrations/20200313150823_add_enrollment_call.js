const AddEnrollmentCall = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('crm_workflow_enrollments', (table) => {
      table.integer('call_id').unsigned()
      table.foreign('call_id').references('maha_calls.id')
    })
  },

  down: async (knex) => {
  }

}

export default AddEnrollmentCall
