const UpdateImports = {

  up: async (knex) => {
    await knex.schema.table('maha_imports', table => {
      table.dropColumn('stage')
    })
    await knex.schema.table('maha_imports', table => {
      table.enum('stage', ['previewing','mapping','configuring','parsing','validating','processing','complete'])
      table.integer('valid_count')
      table.integer('error_count')
      table.integer('omit_count')
      table.integer('duplicate_count')
      table.integer('nonunique_count')
    })
    await knex.schema.table('maha_import_items', table => {
      table.boolean('is_duplicate').defaultTo(false)
      table.boolean('is_omitted').defaultTo(false)
      table.boolean('is_nonunique').defaultTo(false)
    })
  },

  down: async (knex) => {

  }

}

export default UpdateImports
