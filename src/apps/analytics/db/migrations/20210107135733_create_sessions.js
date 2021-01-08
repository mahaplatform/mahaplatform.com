const CreateSession = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('sessions', (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.integer('app_id').unsigned()
      table.foreign('app_id').references('apps.id')
      table.integer('referer_id').unsigned()
      table.foreign('referer_id').references('referers.id')
      table.integer('ipaddress_id').unsigned()
      table.foreign('ipaddress_id').references('ipaddresses.id')
      table.string('domain_sessionid')
      table.integer('domain_sessionidx')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('sessions')
  }

}

export default CreateSession
