const AddWorkflowStepActivity = {

  up: async (knex) => {

    await knex.schema.table('crm_workflow_steps', (table) => {
      table.boolean('is_active')
    })

    await knex('crm_workflow_steps').update({
      is_active: true
    })

  },

  down: async (knex) => {
  }

}

export default AddWorkflowStepActivity
