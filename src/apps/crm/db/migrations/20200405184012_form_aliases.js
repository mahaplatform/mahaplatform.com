const FormAliases = {

  up: async (knex) => {

    await knex.schema.table('crm_forms', (table) => {
      table.string('permalink')
    })

    await knex('crm_forms').where('id', 1).update({
      permalink: '2020-duck-race'
    })

  },

  down: async (knex) => {
  }

}

export default FormAliases
