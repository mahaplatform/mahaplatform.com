const AddErrorFields = {

  databaseName: 'analytics',

  up: async (knex) => {

    await knex.schema.table('events', (table) => {
      table.decimal('value', 8, 2).alter()
    })

    await knex.schema.table('raws', (table) => {
      table.text('error')
      table.integer('attempts')
    })

    await knex('raws').where('status', 'failed').update({
      attempts: 1
    })

    await knex('raws').whereNot('status', 'failed').update({
      attempts: 0
    })

  },

  down: async (knex) => {
  }

}

export default AddErrorFields
