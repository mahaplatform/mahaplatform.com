import Migration from '../../../../../core/objects/migration'

const DropAdvanceColumns = new Migration({

  up: async (knex) => {

    await knex.schema.table('expenses_advances', (table) => {
      table.dropColumn('vendor_id')
      table.dropColumn('delivery_method')
    })

  },

  down: async (knex) => {

    await knex.schema.table('expenses_advances', (table) => {
      table.integer('vendor_id').unsigned()
      table.foreign('vendor_id').references('expenses_vendors.id')
      table.string('delivery_method')
    })

  }

})

export default DropAdvanceColumns
