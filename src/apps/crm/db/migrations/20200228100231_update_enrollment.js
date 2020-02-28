const UpdateEnrollment = {

  up: async (knex) => {
    await knex.schema.table('crm_enrollments', (table) => {
      table.integer('response_id').unsigned()
      table.foreign('response_id').references('crm_responses.id')
    })
  },

  down: async (knex) => {
  }

}

export default UpdateEnrollment
