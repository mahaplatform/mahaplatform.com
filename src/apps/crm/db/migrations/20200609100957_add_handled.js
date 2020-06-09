const AddHandled = {

  up: async (knex) => {

    await knex.schema.table('crm_workflow_recordings', (table) => {
      table.boolean('was_heard')
      table.boolean('was_handled')
    })

  },

  down: async (knex) => {
  }

}

export default AddHandled
