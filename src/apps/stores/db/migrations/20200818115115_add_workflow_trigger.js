const AddWorkflowTrigger = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('alter type crm_workflow_trigger_types add value \'order\'')

    await knex.schema.table('crm_workflow_enrollments', (table) => {
      table.integer('order_id').unsigned()
      table.foreign('order_id').references('stores_orders.id')
    })

  },

  down: async (knex) => {
  }

}

export default AddWorkflowTrigger
