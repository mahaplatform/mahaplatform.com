const AddVoicemailActions = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.raw('alter type crm_workflow_step_actions add value \'timeofday\'')
    await knex.raw('alter type crm_workflow_step_actions add value \'dialbyextension\'')
    await knex.raw('alter type crm_workflow_step_actions add value \'dialbyname\'')
  },

  down: async (knex) => {
  }

}

export default AddVoicemailActions
