const AddRejection = {

  up: async (knex) => {

    await knex.schema.table('eatfresh_attractions', (table) => {
      table.string('rejection_reason')
    })

  },

  down: async (knex) => {

  }

}

export default AddRejection
