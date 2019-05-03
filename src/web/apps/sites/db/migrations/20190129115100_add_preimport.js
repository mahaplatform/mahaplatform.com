import Migration from '../../../../../core/objects/migration'

const AddPreimport = new Migration({

  up: async (knex) => {

    await knex.schema.table('sites_items', (table) => {
      table.jsonb('preimport')
    })

  },

  down: async (knex) => {

    await knex.schema.table('sites_items', (table) => {
      table.dropColumn('preimport')
    })

  }

})

export default AddPreimport
