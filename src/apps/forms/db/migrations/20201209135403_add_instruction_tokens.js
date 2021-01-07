const AddInstructionTokens = {

  databaseName: 'maha',

  up: async (knex) => {
    const forms = await knex('crm_forms')
    await Promise.mapSeries(forms, async(form) => {
      await knex('crm_forms').where('id', form.id).update({
        config: {
          ...form.config,
          fields: form.config.fields.map((field, index) => {
            if(field.type !== 'text') return field
            return {
              ...field,
              image: null,
              name: {
                value: `Instructions ${index+1}`,
                token: `instructions_${index+1}`
              }
            }
          })
        }
      })
    })
  },

  down: async (knex) => {
  }

}

export default AddInstructionTokens
