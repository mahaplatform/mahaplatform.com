const AlterEnrollmentStatus = {

  up: async (knex) => {
    await knex.raw('alter type crm_workflow_enrollment_status add value \'canceled\'')
  },

  down: async (knex) => {
  }

}

export default AlterEnrollmentStatus
