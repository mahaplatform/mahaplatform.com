const PreviewFlag = {

  up: async (knex) => {
    await Promise.mapSeries(['template','email','email_campaign'], async(model) => {
      await knex.schema.table(`crm_${model}s`, (table) => {
        table.bool('has_preview')
      })
      await knex(`crm_${model}s`).update({
        has_preview: true
      })
    })
  },

  down: async (knex) => {
  }

}

export default PreviewFlag
