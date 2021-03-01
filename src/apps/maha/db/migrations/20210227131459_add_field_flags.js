const AddFieldFlags = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.alterTable('maha_fields', function(table) {
      table.boolean('is_active')
      table.timestamp('deleted_at')
    })

    const fields = await knex('maha_fields')

    await Promise.mapSeries(fields, async (field) => {
      await knex('maha_fields').where('id', field.id).update({
        config: {
          ...field.config,
          label: field.label,
          instructions: field.instructions,
          required: field.config.required || false
        },
        is_active: true
      })
    })

    await knex.schema.alterTable('maha_fields', function(table) {
      table.dropColumn('label')
      table.dropColumn('instructions')
    })

  },

  down: async (knex) => {
  }

}

export default AddFieldFlags
