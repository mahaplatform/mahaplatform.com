const TemplateSoftDelete = {

  databaseName: 'maha',

  up: async (knex) => {
    await Promise.mapSeries(['template','email','email_campaign'], async(model) => {
      await knex.schema.table(`crm_${model}s`, (table) => {
        table.timestamp('screenshoted_at')
      })
      await knex.raw(`update crm_${model}s set screenshoted_at = updated_at`)
    })
    await Promise.mapSeries(['template'], async(model) => {
      await knex.schema.table(`crm_${model}s`, (table) => {
        table.timestamp('deleted_at')
      })
    })
  },

  down: async (knex) => {
  }

}

export default TemplateSoftDelete
