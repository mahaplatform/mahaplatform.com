const SoftDelete = {

  databaseName: 'maha',

  up: async (knex) => {

    await Promise.mapSeries(['email','voice','sms','postal','social'], async (model) => {
      await knex.schema.table(`crm_${model}_campaigns`, (table) => {
        table.timestamp('deleted_at')
      })
    })

    await Promise.mapSeries(['form','email','workflow'], async (model) => {
      await knex.schema.table(`crm_${model}s`, (table) => {
        table.timestamp('deleted_at')
      })
    })

  },

  down: async (knex) => {
  }

}

export default SoftDelete
