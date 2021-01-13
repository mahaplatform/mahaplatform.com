const HandleFailedEnrollments = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('alter type crm_workflow_enrollment_status add value \'failed\'')

    await knex.schema.table('crm_workflow_enrollments', (table) => {
      table.text('error')
    })

  },

  down: async (knex) => {
  }

}

export default HandleFailedEnrollments
