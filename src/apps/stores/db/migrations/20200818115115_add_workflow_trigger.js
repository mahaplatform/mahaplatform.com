const AddWorkflowTrigger = {

  up: async (knex) => {

    await knex.raw('alter type crm_workflow_trigger_types add value \'order\'')

  },

  down: async (knex) => {
  }

}

export default AddWorkflowTrigger
