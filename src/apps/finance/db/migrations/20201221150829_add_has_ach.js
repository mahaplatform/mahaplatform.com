const AddHasAch = {

  up: async (knex) => {

    await knex.schema.table('finance_banks', (table) => {
      table.boolean('has_ach')
    })

    await knex('finance_banks').update({
      has_ach: false
    })

    await knex('finance_banks').whereIn('id', [1,2]).update({
      has_ach: true
    })
  },

  down: async (knex) => {
  }

}

export default AddHasAch
