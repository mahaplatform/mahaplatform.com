const AddWorkflowFields = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('crm_workflows', (table) => {
      table.enum('action', ['add','remove'], { useNative: true, enumName: 'crm_workflow_action_types' })
      table.boolean('is_unique')
    })

    await knex('crm_workflow_enrollments').whereNot('was_converted', true).update({
      was_converted: false
    })

  },

  down: async (knex) => {
  }

}

export default AddWorkflowFields
