const schema = {

  load: async (knex) => {

    await knex.schema.createTable('apps', (table) => {
      table.increments('id').primary()
      table.string('title', 255)
      table.string('platform', 255)
    })

    await knex.schema.createTable('cities', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('countries', (table) => {
      table.increments('id').primary()
      table.string('code', 255)
      table.string('text', 255)
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
      table.jsonb('context')
      table.timestamp('tstamp')
      table.timestamp('created_at')
      table.timestamp('updated_at')
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

    await knex.schema.createTable('metro_codes', (table) => {
      table.increments('id').primary()
      table.string('code', 255)
    })

    await knex.schema.createTable('pages', (table) => {
      table.increments('id').primary()
      table.string('title', 255)
      table.string('url', 255)
      table.USER-DEFINED('scheme')
      table.string('host', 255)
      table.string('path', 255)
      table.string('query', 255)
      table.string('fragment', 255)
    })

    await knex.schema.createTable('postal_codes', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('raw', (table) => {
      table.increments('id').primary()
      table.USER-DEFINED('status')
      table.jsonb('data')
      table.jsonb('errors')
    })

    await knex.schema.createTable('referers', (table) => {
      table.increments('id').primary()
      table.string('url', 255)
      table.USER-DEFINED('scheme')
      table.string('host', 255)
      table.string('path', 255)
      table.string('query', 255)
      table.string('fragment', 255)
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
      table.integer('user_id').unsigned()
      table.integer('app_id').unsigned()
      table.integer('referer_id').unsigned()
      table.integer('ipaddress_id').unsigned()
      table.string('domain_sessionid', 255)
      table.integer('domain_sessionidx')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('users', (table) => {
      table.increments('id').primary()
      table.string('user_id', 255)
      table.string('domain_userid', 255)
      table.string('network_userid', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })


    await knex.schema.table('ipaddresses', table => {
      table.foreign('city_id').references('cities.id')
      table.foreign('region_id').references('regions.id')
      table.foreign('country_id').references('countries.id')
      table.foreign('postal_code_id').references('postal_codes.id')
      table.foreign('metro_code_id').references('metro_codes.id')
    })

    await knex.schema.table('sessions', table => {
      table.foreign('user_id').references('users.id')
      table.foreign('app_id').references('apps.id')
      table.foreign('referer_id').references('referers.id')
      table.foreign('ipaddress_id').references('ipaddresses.id')
    })

    await knex.schema.table('events', table => {
      table.foreign('raw_id').references('raw.id')
      table.foreign('session_id').references('sessions.id')
      table.foreign('event_type_id').references('event_types.id')
      table.foreign('page_id').references('pages.id')
    })


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

    await knex.raw(`
      create view user_details AS
      with first_page as (
      select distinct on (sessions.user_id) sessions.user_id,
      events.page_id
      from ((events
      join sessions on ((sessions.id = events.session_id)))
      join event_types on ((event_types.id = events.event_type_id)))
      where ((event_types.type)::text = 'page_view'::text)
      order by sessions.user_id, events.tstamp
      ), last_page as (
      select distinct on (sessions.user_id) sessions.user_id,
      events.page_id
      from ((events
      join sessions on ((sessions.id = events.session_id)))
      join event_types on ((event_types.id = events.event_type_id)))
      where ((event_types.type)::text = 'page_view'::text)
      order by sessions.user_id, events.tstamp desc
      )
      select users.id as user_id,
      first_page.page_id as first_page_id,
      last_page.page_id as last_page_id
      from ((users
      join first_page on ((first_page.user_id = users.id)))
      join last_page on ((last_page.user_id = users.id)));
    `)
  }

}

export default schema
