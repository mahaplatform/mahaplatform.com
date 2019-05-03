import Migration from '../../../../core/objects/migration'

const CreateRights = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('maha_rights', (table) => {
      table.increments('id').primary()
      table.integer('app_id').unsigned()
      table.foreign('app_id').references('maha_apps.id')
      table.unique(['app_id', 'text'])
      table.string('text')
      table.string('description')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_rights')
  }

})

export default CreateRights
