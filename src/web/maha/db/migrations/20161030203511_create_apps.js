import Migration from '../../core/objects/migration'

const CreateApps = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('maha_apps', (table) => {
      table.increments('id').primary()
      table.integer('app_category_id').unsigned()
      table.foreign('app_category_id').references('maha_app_categories.id')
      table.integer('app_author_id').unsigned()
      table.foreign('app_author_id').references('maha_app_authors.id')
      table.string('title')
      table.unique('title')
      table.text('description')
      table.string('version')
      table.string('color')
      table.string('icon')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_apps')
  }

})

export default CreateApps
