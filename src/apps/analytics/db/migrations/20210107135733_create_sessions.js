const CreateSession = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('sessions', (table) => {
      table.increments('id').primary()
      table.integer('domain_user_id').unsigned()
      table.foreign('domain_user_id').references('domain_users.id')
      table.integer('app_id').unsigned()
      table.foreign('app_id').references('apps.id')
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
      table.integer('referer_id').unsigned()
      table.foreign('referer_id').references('referers.id')
      table.integer('ipaddress_id').unsigned()
      table.foreign('ipaddress_id').references('ipaddresses.id')
      table.integer('source_id').unsigned()
      table.foreign('source_id').references('sources.id')
      table.integer('medium_id').unsigned()
      table.foreign('medium_id').references('mediums.id')
      table.integer('campaign_id').unsigned()
      table.foreign('campaign_id').references('campaigns.id')
      table.integer('term_id').unsigned()
      table.foreign('term_id').references('terms.id')
      table.integer('content_id').unsigned()
      table.foreign('content_id').references('contents.id')
      table.integer('network_id').unsigned()
      table.foreign('network_id').references('networks.id')
      table.string('clickid')
      table.string('domain_sessionid')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('sessions')
  }

}

export default CreateSession
