const CreateImports = {

  up: async (knex) => {

    await knex.schema.createTable('maha_imports', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned().references('maha_teams.id')
      table.integer('user_id').unsigned().references('maha_users.id')
      table.integer('asset_id').unsigned().references('maha_assets.id')
      table.string('object_type')
      table.string('name')
      table.enum('stage', ['previewing','mapping','configuring','validating','processing','complete'])
      table.boolean('headers').defaultTo(false)
      table.string('delimiter')
      table.enum('strategy', ['ignore','overwrite','discard','create'])
      table.specificType('mapping', 'jsonb[]')
      table.string('primary_key')
      table.integer('item_count')
      table.integer('created_count')
      table.integer('merged_count')
      table.integer('ignored_count')
      table.timestamps()
    })

  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_imports')
  }

}

export default CreateImports
