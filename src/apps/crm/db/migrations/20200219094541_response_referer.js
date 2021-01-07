const ResponseReferer = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('crm_responses', (table) => {
      table.text('referer')
    })
  },

  down: async (knex) => {
  }

}

export default ResponseReferer
