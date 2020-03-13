const AddEnrollmentStatus = {

  up: async (knex) => {

    await knex.schema.table('crm_workflow_enrollments', (table) => {
      table.enum('status', ['initiated','ringing','answered','completed'], { useNative: true, enumName: 'crm_workflow_trigger_types' })
    })

  },

  down: async (knex) => {
  }

}

export default AddEnrollmentStatus
