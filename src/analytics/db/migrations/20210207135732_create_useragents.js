const CreateUseragent = {

  databaseName: 'analytics',

  up: async (knex) => {

    await knex.schema.createTable('useragents', (table) => {
      table.increments('id').primary()
      table.integer('device_id').unsigned()
      table.foreign('device_id').references('devices.id')
      table.integer('manufacturer_id').unsigned()
      table.foreign('manufacturer_id').references('manufacturers.id')
      table.integer('os_id').unsigned()
      table.foreign('os_id').references('oses.id')
      table.integer('os_version_id').unsigned()
      table.foreign('os_version_id').references('versions.id')
      table.integer('browser_id').unsigned()
      table.foreign('browser_id').references('browsers.id')
      table.integer('browser_version_id').unsigned()
      table.foreign('browser_version_id').references('versions.id')
      table.text('useragent')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('useragents')
  }

}

export default CreateUseragent
