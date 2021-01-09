const schema = {

  load: async (knex) => {

    await knex.schema.createTable('actions', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('apps', (table) => {
      table.increments('id').primary()
      table.string('title', 255)
      table.string('platform', 255)
    })

    await knex.schema.createTable('browsers', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('campaigns', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('categories', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('cities', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('contacts', (table) => {
      table.increments('id').primary()
      table.integer('network_user_id').unsigned()
      table.integer('contact_id')
    })

    await knex.schema.createTable('contents', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('countries', (table) => {
      table.increments('id').primary()
      table.string('code', 255)
      table.string('text', 255)
    })

    await knex.schema.createTable('devices', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('domain_users', (table) => {
      table.increments('id').primary()
      table.integer('network_user_id').unsigned()
      table.string('domain_userid', 255)
    })

    await knex.schema.createTable('domains', (table) => {
      table.name('domain_catalog')
      table.name('domain_schema')
      table.name('domain_name')
      table.string('data_type', null)
      table.integer('character_maximum_length')
      table.integer('character_octet_length')
      table.name('character_set_catalog')
      table.name('character_set_schema')
      table.name('character_set_name')
      table.name('collation_catalog')
      table.name('collation_schema')
      table.name('collation_name')
      table.integer('numeric_precision')
      table.integer('numeric_precision_radix')
      table.integer('numeric_scale')
      table.integer('datetime_precision')
      table.string('interval_type', null)
      table.integer('interval_precision')
      table.string('domain_default', null)
      table.name('udt_catalog')
      table.name('udt_schema')
      table.name('udt_name')
      table.name('scope_catalog')
      table.name('scope_schema')
      table.name('scope_name')
      table.integer('maximum_cardinality')
      table.name('dtd_identifier')
      table.increments('id').primary()
      table.string('name', 255)
    })

    await knex.schema.createTable('event_types', (table) => {
      table.increments('id').primary()
      table.string('type', 255)
    })

    await knex.schema.createTable('events', (table) => {
      table.increments('id').primary()
      table.integer('raw_id').unsigned()
      table.integer('session_id').unsigned()
      table.integer('event_type_id').unsigned()
      table.integer('page_id').unsigned()
      table.integer('action_id').unsigned()
      table.integer('network_id').unsigned()
      table.integer('label_id').unsigned()
      table.integer('property_id').unsigned()
      table.integer('category_id').unsigned()
      table.double precision('value')
      table.decimal('tr_total', 8, 2)
      table.decimal('tr_tax', 8, 2)
      table.decimal('ti_price', 8, 2)
      table.integer('ti_quantity')
      table.integer('ti_currency')
      table.integer('ti_price_base')
      table.integer('base_currency')
      table.integer('pp_xoffset_min')
      table.integer('pp_xoffset_max')
      table.integer('pp_yoffset_min')
      table.integer('pp_yoffset_max')
      table.jsonb('data')
      table.timestamp('tstamp')
      table.string('ti_orderid', 255)
      table.string('event_id', 255)
      table.string('target', 255)
      table.string('ti_sku', 255)
      table.string('tr_orderid', 255)
      table.string('tr_affiliation', 255)
      table.string('ti_name', 255)
      table.string('ti_category', 255)
      table.string('tr_city', 255)
      table.string('tr_state', 255)
      table.string('tr_country', 255)
      table.string('tr_currency', 255)
      table.string('tr_total_base', 255)
      table.string('tr_tax_base', 255)
      table.string('tr_shipping_base', 255)
    })

    await knex.schema.createTable('ipaddresses', (table) => {
      table.increments('id').primary()
      table.integer('city_id').unsigned()
      table.integer('region_id').unsigned()
      table.integer('country_id').unsigned()
      table.integer('postal_code_id').unsigned()
      table.integer('metro_code_id').unsigned()
      table.decimal('latitude', 10, 6)
      table.decimal('longitude', 10, 6)
      table.string('address', 255)
    })

    await knex.schema.createTable('labels', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('manufacturers', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('mediums', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('metro_codes', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('network_users', (table) => {
      table.increments('id').primary()
      table.string('network_userid', 255)
    })

    await knex.schema.createTable('networks', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('oses', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('pages', (table) => {
      table.increments('id').primary()
      table.integer('domain_id').unsigned()
      table.string('title', 255)
      table.string('url', 255)
      table.string('path', 255)
    })

    await knex.schema.createTable('postal_codes', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('properties', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('raw', (table) => {
      table.increments('id').primary()
      table.USER-DEFINED('status')
      table.jsonb('data')
      table.jsonb('errors')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('referers', (table) => {
      table.increments('id').primary()
      table.integer('domain_id').unsigned()
      table.string('url', 255)
      table.string('path', 255)
    })

    await knex.schema.createTable('regions', (table) => {
      table.increments('id').primary()
      table.string('code', 255)
      table.string('text', 255)
    })

    await knex.schema.createTable('schema_migrations', (table) => {
      table.string('migration', 255)
    })

    await knex.schema.createTable('sessions', (table) => {
      table.increments('id').primary()
      table.integer('domain_user_id').unsigned()
      table.integer('app_id').unsigned()
      table.integer('device_id').unsigned()
      table.integer('manufacturer_id').unsigned()
      table.integer('os_id').unsigned()
      table.integer('os_version_id').unsigned()
      table.integer('browser_id').unsigned()
      table.integer('browser_version_id').unsigned()
      table.integer('referer_id').unsigned()
      table.integer('ipaddress_id').unsigned()
      table.integer('source_id').unsigned()
      table.integer('medium_id').unsigned()
      table.integer('campaign_id').unsigned()
      table.integer('term_id').unsigned()
      table.integer('content_id').unsigned()
      table.string('domain_sessionid', 255)
    })

    await knex.schema.createTable('sources', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('terms', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('versions', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })


    await knex.schema.table('contacts', table => {
      table.foreign('network_user_id').references('network_users.id')
    })

    await knex.schema.table('domain_users', table => {
      table.foreign('network_user_id').references('network_users.id')
    })

    await knex.schema.table('referers', table => {
      table.foreign('domain_id').references('domains.id')
    })

    await knex.schema.table('ipaddresses', table => {
      table.foreign('city_id').references('cities.id')
      table.foreign('region_id').references('regions.id')
      table.foreign('country_id').references('countries.id')
      table.foreign('postal_code_id').references('postal_codes.id')
      table.foreign('metro_code_id').references('metro_codes.id')
    })

    await knex.schema.table('sessions', table => {
      table.foreign('domain_user_id').references('domain_users.id')
      table.foreign('app_id').references('apps.id')
      table.foreign('device_id').references('devices.id')
      table.foreign('manufacturer_id').references('manufacturers.id')
      table.foreign('os_id').references('oses.id')
      table.foreign('os_version_id').references('versions.id')
      table.foreign('browser_id').references('browsers.id')
      table.foreign('browser_version_id').references('versions.id')
      table.foreign('referer_id').references('referers.id')
      table.foreign('ipaddress_id').references('ipaddresses.id')
      table.foreign('source_id').references('sources.id')
      table.foreign('medium_id').references('mediums.id')
      table.foreign('campaign_id').references('campaigns.id')
      table.foreign('term_id').references('terms.id')
      table.foreign('content_id').references('contents.id')
    })

    await knex.schema.table('pages', table => {
      table.foreign('domain_id').references('domains.id')
    })

    await knex.schema.table('events', table => {
      table.foreign('raw_id').references('raw.id')
      table.foreign('session_id').references('sessions.id')
      table.foreign('event_type_id').references('event_types.id')
      table.foreign('page_id').references('pages.id')
      table.foreign('action_id').references('actions.id')
      table.foreign('network_id').references('networks.id')
      table.foreign('label_id').references('labels.id')
      table.foreign('property_id').references('properties.id')
      table.foreign('category_id').references('categories.id')
    })


    await knex.raw(`
      create view domain_user_details AS
      with first_page as (
      select distinct on (sessions.domain_user_id) sessions.domain_user_id,
      events.page_id
      from ((events
      join sessions on ((sessions.id = events.session_id)))
      join event_types on ((event_types.id = events.event_type_id)))
      where ((event_types.type)::text = 'page_view'::text)
      order by sessions.domain_user_id, events.tstamp
      ), last_page as (
      select distinct on (sessions.domain_user_id) sessions.domain_user_id,
      events.page_id
      from ((events
      join sessions on ((sessions.id = events.session_id)))
      join event_types on ((event_types.id = events.event_type_id)))
      where ((event_types.type)::text = 'page_view'::text)
      order by sessions.domain_user_id, events.tstamp desc
      )
      select domain_users.id as domain_domain_user_id,
      first_page.page_id as first_page_id,
      last_page.page_id as last_page_id
      from ((domain_users
      join first_page on ((first_page.domain_user_id = domain_users.id)))
      join last_page on ((last_page.domain_user_id = domain_users.id)));
    `)

    await knex.raw(`
      create view session_details AS
      with pageviews as (
      select events.session_id,
      count(events.*) as pageviews
      from ((events
      join sessions sessions_1 on ((sessions_1.id = events.session_id)))
      join event_types on ((event_types.id = events.event_type_id)))
      where ((event_types.type)::text = 'page_view'::text)
      group by events.session_id
      ), first_event as (
      select distinct on (sessions_1.id) sessions_1.id as session_id,
      events.tstamp
      from (sessions sessions_1
      join events on ((events.session_id = sessions_1.id)))
      order by sessions_1.id, events.id
      ), last_event as (
      select distinct on (sessions_1.id) sessions_1.id as session_id,
      events.tstamp
      from (sessions sessions_1
      join events on ((events.session_id = sessions_1.id)))
      order by sessions_1.id, events.id desc
      ), first_page as (
      select distinct on (sessions_1.id) sessions_1.id as session_id,
      events.page_id
      from ((events
      join sessions sessions_1 on ((sessions_1.id = events.session_id)))
      join event_types on ((event_types.id = events.event_type_id)))
      where ((event_types.type)::text = 'page_view'::text)
      order by sessions_1.id, events.tstamp
      ), last_page as (
      select distinct on (sessions_1.id) sessions_1.id as session_id,
      events.page_id
      from ((events
      join sessions sessions_1 on ((sessions_1.id = events.session_id)))
      join event_types on ((event_types.id = events.event_type_id)))
      where ((event_types.type)::text = 'page_view'::text)
      order by sessions_1.id, events.tstamp desc
      )
      select sessions.id as session_id,
      pageviews.pageviews,
      first_event.tstamp as first_event_tstamp,
      last_event.tstamp as last_event_tstamp,
      first_page.page_id as first_page_id,
      last_page.page_id as last_page_id
      from (((((sessions
      join pageviews on ((pageviews.session_id = sessions.id)))
      join first_event on ((first_event.session_id = sessions.id)))
      join last_event on ((last_event.session_id = sessions.id)))
      join first_page on ((first_page.session_id = sessions.id)))
      join last_page on ((last_page.session_id = sessions.id)));
    `)
  }

}

export default schema
