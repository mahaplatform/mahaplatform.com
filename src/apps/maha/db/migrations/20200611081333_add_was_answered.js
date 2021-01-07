const AddWasAnswered = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('maha_calls', (table) => {
      table.boolean('was_answered')
    })

    await knex('maha_calls').update({
      was_answered: true
    })

  },

  down: async (knex) => {
  }

}

export default AddWasAnswered
