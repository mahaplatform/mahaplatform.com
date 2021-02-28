const AddFieldFlags = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.alterTable('maha_fields', function(table) {
      table.boolean('is_active')
      table.timestamp('deleted_at')
    })

    await knex('maha_fields').update({
      is_active: true,
      is_primary: false
    })

  },

  down: async (knex) => {
  }

}

export default AddFieldFlags
