const UpdateFieldTokens = {

  databaseName: 'maha',

  up: async (knex) => {

    const fields = await knex('maha_fields')

    await knex.schema.table('maha_fields', (table) => {
      table.dropColumn('name')
    })

    await knex.schema.table('maha_fields', (table) => {
      table.jsonb('name')
    })

    await Promise.mapSeries(fields, async(field) => {
      await knex('maha_fields').where({
        id: field.id
      }).update({
        name: {
          token: field.name,
          value: field.label
        }
      })
    })

  },

  down: async (knex) => {
  }

}

export default UpdateFieldTokens
