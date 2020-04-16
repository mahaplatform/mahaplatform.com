const TemplateSoftDelete = {

  up: async (knex) => {
    await knex.schema.table('crm_templates', (table) => {
      table.timestamp('deleted_at')
    })
  },

  down: async (knex) => {
  }

}

export default TemplateSoftDelete
