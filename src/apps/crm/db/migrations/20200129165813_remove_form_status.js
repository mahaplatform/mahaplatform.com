const RemoveFormStatus = {

  up: async (knex) => {

    await knex.schema.table('crm_forms', (table) => {
      table.dropColumn('status')
    })

    await knex.raw('drop type crm_forms_status')

  },

  down: async (knex) => {
  }

}

export default RemoveFormStatus
