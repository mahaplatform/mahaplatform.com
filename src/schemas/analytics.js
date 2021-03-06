const schema = {

  load: async (knex) => {

    await knex.schema.createTable('apps', (table) => {
      table.increments('id').primary()
      table.integer('platform_id').unsigned()
      table.string('title', 255)
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

    await knex.schema.createTable('contents', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('contexts', (table) => {
      table.increments('id').primary()
      table.string('context_id', 255)
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
      table.integer('contact_id')
      table.string('domain_userid', 255)
    })

    await knex.schema.createTable('domains', (table) => {
      table.increments('id').primary()
      table.integer('character_maximum_length')
      table.integer('character_octet_length')
      table.integer('numeric_precision')
      table.integer('numeric_precision_radix')
      table.integer('numeric_scale')
      table.integer('datetime_precision')
      table.integer('interval_precision')
      table.integer('maximum_cardinality')
      table.string('text', 255)
      table.name('character_set_name')
      table.name('collation_catalog')
      table.name('collation_schema')
      table.name('collation_name')
      table.name('udt_name')
      table.name('scope_catalog')
      table.name('scope_schema')
      table.name('scope_name')
      table.string('interval_type', null)
      table.name('dtd_identifier')
      table.string('domain_default', null)
      table.name('domain_catalog')
      table.name('domain_schema')
      table.name('domain_name')
      table.string('data_type', null)
      table.name('udt_catalog')
      table.name('udt_schema')
      table.name('character_set_schema')
      table.name('character_set_catalog')
    })

    await knex.schema.createTable('event_types', (table) => {
      table.increments('id').primary()
      table.string('type', 255)
    })

    await knex.schema.createTable('events', (table) => {
      table.timestamp('tstamp')
      table.integer('session_id').unsigned()
      table.integer('event_type_id').unsigned()
      table.integer('page_id').unsigned()
      table.integer('context_id')
      table.increments('id').primary()
      table.integer('doc_width')
      table.integer('doc_height')
      table.integer('view_width')
      table.integer('view_height')
      table.jsonb('data')
      table.string('event_id', 255)
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
      table.integer('protocol_id').unsigned()
      table.integer('domain_id').unsigned()
      table.string('title', 255)
      table.string('path', 255)
    })

    await knex.schema.createTable('platforms', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('postal_codes', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('properties', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('protocols', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('raws', (table) => {
      table.increments('id').primary()
      table.jsonb('data')
      table.jsonb('enriched')
      table.USER-DEFINED('validation_status')
      table.USER-DEFINED('enrichment_status')
      table.USER-DEFINED('modeling_status')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.text('validation_error')
      table.text('modeling_error')
      table.text('enrichment_error')
      table.text('error')
    })

    await knex.schema.createTable('referers', (table) => {
      table.increments('id').primary()
      table.integer('protocol_id').unsigned()
      table.integer('domain_id').unsigned()
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
      table.integer('referer_id').unsigned()
      table.integer('ipaddress_id').unsigned()
      table.integer('source_id').unsigned()
      table.integer('medium_id').unsigned()
      table.integer('campaign_id').unsigned()
      table.integer('term_id').unsigned()
      table.integer('content_id').unsigned()
      table.integer('network_id').unsigned()
      table.integer('useragent_id').unsigned()
      table.integer('email_campaign_id')
      table.integer('email_id')
      table.integer('form_id')
      table.integer('response_id')
      table.integer('event_id')
      table.integer('registration_id')
      table.integer('store_id')
      table.integer('order_id')
      table.integer('website_id')
      table.string('clickid', 255)
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

    await knex.schema.createTable('useragents', (table) => {
      table.increments('id').primary()
      table.integer('device_id').unsigned()
      table.integer('manufacturer_id').unsigned()
      table.integer('os_id').unsigned()
      table.integer('os_version_id').unsigned()
      table.integer('browser_id').unsigned()
      table.integer('browser_version_id').unsigned()
      table.text('useragent')
    })

    await knex.schema.createTable('versions', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })


    await knex.schema.table('apps', table => {
      table.foreign('platform_id').references('platforms.id')
    })

    await knex.schema.table('referers', table => {
      table.foreign('protocol_id').references('protocols.id')
      table.foreign('domain_id').references('domains.id')
    })

    await knex.schema.table('ipaddresses', table => {
      table.foreign('city_id').references('cities.id')
      table.foreign('region_id').references('regions.id')
      table.foreign('country_id').references('countries.id')
      table.foreign('postal_code_id').references('postal_codes.id')
      table.foreign('metro_code_id').references('metro_codes.id')
    })

    await knex.schema.table('useragents', table => {
      table.foreign('device_id').references('devices.id')
      table.foreign('manufacturer_id').references('manufacturers.id')
      table.foreign('os_id').references('oses.id')
      table.foreign('os_version_id').references('versions.id')
      table.foreign('browser_id').references('browsers.id')
      table.foreign('browser_version_id').references('versions.id')
    })

    await knex.schema.table('sessions', table => {
      table.foreign('domain_user_id').references('domain_users.id')
      table.foreign('app_id').references('apps.id')
      table.foreign('referer_id').references('referers.id')
      table.foreign('ipaddress_id').references('ipaddresses.id')
      table.foreign('source_id').references('sources.id')
      table.foreign('medium_id').references('mediums.id')
      table.foreign('campaign_id').references('campaigns.id')
      table.foreign('term_id').references('terms.id')
      table.foreign('content_id').references('contents.id')
      table.foreign('network_id').references('networks.id')
      table.foreign('useragent_id').references('useragents.id')
    })

    await knex.schema.table('pages', table => {
      table.foreign('protocol_id').references('protocols.id')
      table.foreign('domain_id').references('domains.id')
    })

    await knex.schema.table('events', table => {
      table.foreign('session_id').references('sessions.id')
      table.foreign('event_type_id').references('event_types.id')
      table.foreign('page_id').references('pages.id')
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
      create view event_details AS
      select events.id as event_id,
      event_types.type,
      pages.title as page_title,
      case
      when (events.page_id is not null) then concat(page_protocols.text, '://', page_domains.text, pages.path)
      else null::text
      end as page_url,
      pageview_details.duration,
      pageview_details.scrolldepth,
      events.data,
      events.tstamp
      from (((((events
      join event_types on ((event_types.id = events.event_type_id)))
      left join pages on ((pages.id = events.page_id)))
      left join protocols page_protocols on ((page_protocols.id = pages.protocol_id)))
      left join domains page_domains on ((page_domains.id = pages.domain_id)))
      left join pageview_details on ((pageview_details.pageview_id = events.id)));
    `)

    await knex.raw(`
      create view pageview_details AS
      with pageviews as (
      select events.id,
      events.session_id,
      events.event_type_id,
      events.page_id,
      events.context_id,
      events.event_id,
      events.doc_width,
      events.doc_height,
      events.view_width,
      events.view_height,
      events.data,
      events.tstamp
      from (events
      join event_types on ((event_types.id = events.event_type_id)))
      where ((event_types.type)::text = 'page_view'::text)
      order by events.tstamp
      ), pagepings as (
      select events.context_id,
      events.tstamp,
      ((events.data ->> 'y_max'::text))::integer as y_max,
      events.doc_height
      from (events
      join event_types on ((event_types.id = events.event_type_id)))
      where ((event_types.type)::text = 'page_ping'::text)
      order by events.tstamp desc
      ), durations as (
      select distinct on (pagepings.context_id) pageviews_1.id as pageview_id,
      ceil(date_part('epoch'::text, (pagepings.tstamp - pageviews_1.tstamp))) as duration
      from (pageviews pageviews_1
      join pagepings on ((pagepings.context_id = pageviews_1.context_id)))
      ), maxdepths as (
      select pageviews_1.id as pageview_id,
      max(pagepings.y_max) as maxdepth
      from (pageviews pageviews_1
      join pagepings on ((pagepings.context_id = pageviews_1.context_id)))
      group by pageviews_1.id
      ), documents as (
      select pageviews_1.id as pageview_id,
      min(pagepings.doc_height) as doc_height
      from (pageviews pageviews_1
      join pagepings on ((pagepings.context_id = pageviews_1.context_id)))
      group by pageviews_1.id
      ), scrolldepths as (
      select pageviews_1.id as pageview_id,
      round((least((((least(maxdepths.maxdepth, pageviews_1.doc_height) + pageviews_1.view_height))::double precision / (documents.doc_height)::double precision), (1)::double precision))::numeric, 2) as scrolldepth
      from ((pageviews pageviews_1
      join maxdepths on ((maxdepths.pageview_id = pageviews_1.id)))
      join documents on ((documents.pageview_id = pageviews_1.id)))
      )
      select pageviews.id as pageview_id,
      coalesce(durations.duration, (0)::double precision) as duration,
      coalesce(scrolldepths.scrolldepth, (0)::numeric) as scrolldepth
      from ((pageviews
      left join durations on ((durations.pageview_id = pageviews.id)))
      left join scrolldepths on ((scrolldepths.pageview_id = pageviews.id)));
    `)

    await knex.raw(`
      create view session_details AS
      with pageviews as (
      select sessions_1.id as session_id,
      count(events.*) as total
      from ((sessions sessions_1
      join events on ((events.session_id = sessions_1.id)))
      join event_types on ((event_types.id = events.event_type_id)))
      where ((event_types.type)::text = 'page_view'::text)
      group by sessions_1.id
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
      domain_users.domain_userid,
      domain_users.contact_id,
      apps.title as app,
      platforms.text as platform,
      case
      when (sessions.referer_id is not null) then concat(referer_protocols.text, '://', referer_domains.text, referers.path)
      else null::text
      end as referer,
      cities.text as city,
      regions.text as region,
      countries.text as country,
      postal_codes.text as postal_code,
      metro_codes.text as metro_code,
      ipaddresses.latitude,
      ipaddresses.longitude,
      ipaddresses.address as ipaddress,
      sources.text as source,
      mediums.text as medium,
      campaigns.text as campaign,
      terms.text as term,
      contents.text as content,
      networks.text as network,
      devices.text as device,
      manufacturers.text as manufacturer,
      oses.text as os,
      os_versions.text as os_version,
      browsers.text as browser,
      browser_versions.text as browser_version,
      useragents.useragent,
      sessions.clickid,
      sessions.form_id,
      sessions.response_id,
      sessions.event_id,
      sessions.registration_id,
      sessions.store_id,
      sessions.order_id,
      sessions.website_id,
      pageviews.total as pageviews_count,
      ceil(date_part('epoch'::text, (last_event.tstamp - first_event.tstamp))) as duration,
      first_page.page_id as first_page_id,
      last_page.page_id as last_page_id,
      first_event.tstamp as started_at,
      last_event.tstamp as ended_at
      from ((((((((((((((((((((((((((((((sessions
      left join pageviews on ((pageviews.session_id = sessions.id)))
      left join first_page on ((first_page.session_id = sessions.id)))
      left join last_page on ((last_page.session_id = sessions.id)))
      join first_event on ((first_event.session_id = sessions.id)))
      join last_event on ((last_event.session_id = sessions.id)))
      join domain_users on ((domain_users.id = sessions.domain_user_id)))
      join apps on ((apps.id = sessions.app_id)))
      join platforms on ((platforms.id = apps.platform_id)))
      left join referers on ((referers.id = sessions.referer_id)))
      left join protocols referer_protocols on ((referer_protocols.id = referers.protocol_id)))
      left join domains referer_domains on ((referer_domains.id = referers.domain_id)))
      left join ipaddresses on ((ipaddresses.id = sessions.ipaddress_id)))
      left join cities on ((cities.id = ipaddresses.city_id)))
      left join regions on ((regions.id = ipaddresses.region_id)))
      left join countries on ((countries.id = ipaddresses.country_id)))
      left join postal_codes on ((postal_codes.id = ipaddresses.postal_code_id)))
      left join metro_codes on ((metro_codes.id = ipaddresses.metro_code_id)))
      left join sources on ((sources.id = sessions.source_id)))
      left join mediums on ((mediums.id = sessions.medium_id)))
      left join campaigns on ((campaigns.id = sessions.campaign_id)))
      left join terms on ((terms.id = sessions.term_id)))
      left join contents on ((contents.id = sessions.content_id)))
      left join networks on ((networks.id = sessions.network_id)))
      left join useragents on ((useragents.id = sessions.useragent_id)))
      left join devices on ((devices.id = useragents.device_id)))
      left join manufacturers on ((manufacturers.id = useragents.manufacturer_id)))
      left join oses on ((oses.id = useragents.os_id)))
      left join versions os_versions on ((os_versions.id = useragents.os_version_id)))
      left join browsers on ((browsers.id = useragents.browser_id)))
      left join versions browser_versions on ((browser_versions.id = useragents.browser_version_id)));
    `)
  }

}

export default schema
