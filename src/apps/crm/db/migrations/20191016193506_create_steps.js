const CreateStep = {

  up: async (knex) => {
    await knex.schema.createTable('crm_steps', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('workflow_id').unsigned()
      table.foreign('workflow_id').references('crm_workflows.id')
      table.integer('parent_id').unsigned()
      table.foreign('parent_id').references('crm_steps.id')
      table.enum('type', ['verb','conditional','delay','action','goal'], { useNative: true, enumName: 'crm_steps_type' })
      table.enum('subtype', ['play','say','record','message','question','ifelse','add_to_list','remove_from_list','enroll_in_workflow','update_property','update_interest','send_email','send_sms'], { useNative: true, enumName: 'crm_steps_subtype' })
      table.string('code')
      table.string('answer')
      table.integer('delta')
      table.jsonb('config')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_steps')
  }

}

export default CreateStep
