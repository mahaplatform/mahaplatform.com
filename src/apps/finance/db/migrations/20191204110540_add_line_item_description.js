const AddLineItemDescription = {

  up: async (knex) => {

    await knex.schema.table('finance_line_items', (table) => {
      table.string('description')
    })

  },

  down: async (knex) => {
  }

}

export default AddLineItemDescription
