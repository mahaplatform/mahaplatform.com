const UpdateWorkflowTables = {

  up: async (knex) => {

    await knex.schema.table('crm_voice_campaigns', (table) => {
      table.dropColumn('steps')
      table.jsonb('to')
      table.jsonb('data')
      table.string('job_id')
    })

    await knex.schema.table('crm_sms_campaigns', (table) => {
      table.jsonb('data')
      table.string('job_id')
    })

    await Promise.mapSeries(['enrollments','steps'], async (model) => {
      await knex.schema.table(`crm_workflow_${model}`, (table) => {
        table.integer('voice_campaign_id').unsigned()
        table.foreign('voice_campaign_id').references('crm_voice_campaigns.id')
        table.integer('sms_campaign_id').unsigned()
        table.foreign('sms_campaign_id').references('crm_sms_campaigns.id')
      })
    })

  },

  down: async (knex) => {
  }

}

export default UpdateWorkflowTables
