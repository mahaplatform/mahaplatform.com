const WasOptedOut = {

  up: async (knex) => {

    await knex.schema.table('crm_workflow_enrollments', (table) => {
      table.boolean('was_opted_out')
    })

  },

  down: async (knex) => {
  }

}

export default WasOptedOut
