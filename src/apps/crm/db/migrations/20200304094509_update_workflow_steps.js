const UpdateWorkflowSteps = {

  up: async (knex) => {

    await knex.schema.table('crm_workflow_steps', (table) => {
      table.dropColumn('type')
      table.dropColumn('action')
    })

    await knex.raw('drop type crm_workflow_step_types')

    await knex.schema.table('crm_workflow_steps', (table) => {
      table.enum('type', ['administrative','control','contact','communication'], { useNative: true, enumName: 'crm_workflow_step_types' })
      table.enum('action', ['ifthen','wait','goal','list','topic','consent','workflow','property','email','sms','question','listen','message'], { useNative: true, enumName: 'crm_workflow_step_actions' })
    })

    await knex('crm_workflow_steps').where('id', 1).update({
      type: 'communication',
      action: 'email'
    })

    await knex('crm_workflow_steps').where('id', 4).update({
      type: 'control',
      action: 'ifthen',
      config: {
        branches: [{
          code: '7gz9vp08nd',
          name: 'Is Checked',
          criteria: {
            $and: [{
              'response.3tjrwr': {
                $eq: true
              }
            }]
          }
        }]
      }
    })

    await knex('crm_workflow_steps').where('id', 5).update({
      type: 'contact',
      action: 'consent'
    })

    await knex('crm_workflow_steps').where('id', 6).update({
      type: 'contact',
      action: 'topic'
    })

  },

  down: async (knex) => {
  }

}

export default UpdateWorkflowSteps
