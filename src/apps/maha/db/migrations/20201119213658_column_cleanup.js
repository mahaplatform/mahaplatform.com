const ColumnCleanup = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('crm_workflows', (table) => {
      table.dropColumn('description')
    })

    await knex.schema.table('maha_roles', (table) => {
      table.dropColumn('description')
    })

    const workflows = await knex('crm_workflows').whereNull('program_id')

    await Promise.mapSeries(workflows, async(workflow) => {

      const email_campaign = await knex('crm_email_campaigns').where({
        id: workflow.email_campaign_id
      }).then(results => results[0])

      if(!email_campaign) return

      await knex('crm_workflows').where('id', workflow.id).update({
        program_id: email_campaign.program_id
      })

    })

  },

  down: async (knex) => {
  }

}

export default ColumnCleanup
