const RemoveConfigValues = {

  up: async (knex) => {
    await knex.schema.table('crm_emails', (table) => {
      table.dropColumn('sender_id')
      table.dropColumn('subject')
      table.dropColumn('reply_to')
    })
  },

  down: async (knex) => {
  }

}

export default RemoveConfigValues
