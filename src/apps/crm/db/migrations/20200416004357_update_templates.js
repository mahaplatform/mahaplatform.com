const UpdateTemplates = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('crm_templates', (table) => {
      table.dropColumn('parent_id')
      table.dropColumn('type')
    })
  },

  down: async (knex) => {
  }

}

export default UpdateTemplates
