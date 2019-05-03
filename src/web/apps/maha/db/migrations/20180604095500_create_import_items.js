import Migration from '../../../../core/objects/migration'

const CreateImports = new Migration({

  up: async (knex) => {

    await knex.schema.createTable('maha_import_items', (table) => {
      table.increments('id').primary()
      table.integer('import_id').unsigned().references('maha_imports.id')
      table.jsonb('values')
      table.boolean('is_valid').defaultTo(false)
      table.enum('result', ['created','merged','ignored'])
      table.integer('object_id')
    })

  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_import_items')
  }

})

export default CreateImports
