const CreateSession = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('sessions', (table) => {
      table.increments('id').primary()
      table.integer('domain_user_id').unsigned()
      table.foreign('domain_user_id').references('domain_users.id')
      table.integer('app_id').unsigned()
      table.foreign('app_id').references('apps.id')
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
      table.integer('useragent_id').unsigned()
      table.foreign('useragent_id').references('useragents.id')
      table.integer('email_campaign_id').index('email_campaign_id')
      table.integer('email_id').index('email_id')
      table.integer('form_id').index('form_id')
      table.integer('response_id').index('response_id')
      table.integer('event_id').index('event_id')
      table.integer('registration_id').index('registration_id')
      table.integer('store_id').index('store_id')
      table.integer('order_id').index('order_id')
      table.integer('website_id').index('website_id')
      table.string('clickid')
      table.string('domain_sessionid')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('sessions')
  }

}

export default CreateSession
