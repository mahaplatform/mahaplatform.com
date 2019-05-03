import Migration from '../../../../core/objects/migration'

const CreateAppAuthors = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('maha_app_authors', (table) => {
      table.increments('id').primary()
      table.string('name')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_app_authors')
  }

})

export default CreateAppAuthors
