const AddFormStatus = {

  up: async (knex) => {

    await knex.schema.table('crm_forms', (table) => {
      table.enum('status', ['draft','active','inactive'], { useNative: true, enumName: 'crm_forms_status' })
    })

  },

  down: async (knex) => {
  }

}

export default AddFormStatus
