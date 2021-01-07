const FixActionEmails = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('crm_workflow_actions', (table) => {
      table.integer('sms_id').unsigned()
      table.foreign('sms_id').references('maha_smses.id')
      table.timestamp('waited_until')
    })

  },

  down: async (knex) => {
  }

}

export default FixActionEmails
