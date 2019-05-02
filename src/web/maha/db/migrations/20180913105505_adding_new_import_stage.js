import { Migration } from 'maha'

const UpdateImports = new Migration({

  up: async (knex) => {
    await knex.schema.table('maha_imports', table => {
      table.dropColumn('stage')
    })
    await knex.schema.table('maha_imports', table => {
      table.enum('stage', ['previewing','mapping','configuring','parsing','validating','processing','finalizing','complete'])
    })
  },

  down: async (knex) => {

  }

})

export default UpdateImports
