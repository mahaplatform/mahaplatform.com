const UpdateWorkflowTriggerTypes = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('crm_workflows', (table) => {
      table.dropColumn('trigger_type')
    })

    await knex.raw('drop type crm_workflow_trigger_types')

    await knex.schema.table('crm_workflows', (table) => {
      table.enum('trigger_type', ['response','open','click','manual'], { useNative: true, enumName: 'crm_workflow_trigger_types' })
    })

    await knex.raw('update crm_workflows set trigger_type=\'response\'')

  },

  down: async (knex) => {
  }

}

export default UpdateWorkflowTriggerTypes
