const CreateDatasetAccess = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('datasets_dataset_accesses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('dataset_id').unsigned()
      table.foreign('dataset_id').references('datasets_datasets.id')
      table.integer('grouping_id').unsigned()
      table.foreign('grouping_id').references('maha_groupings.id')
      table.integer('group_id').unsigned()
      table.foreign('group_id').references('maha_groups.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.enum('type', ['manage','edit','view'], { useNative: true, enumName: 'datasets_dataset_access_types' })
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('datasets_dataset_accesses')
  }

}

export default CreateDatasetAccess
