const CreateSessionDetails = {

  databaseName: 'analytics',

  up: async (knex) => {

    await knex.raw(`
      create view session_details as
      with pageviews as (
      select sessions.id as session_id,
      count(events.*) as total
      from sessions
      inner join events on events.session_id=sessions.id
      inner join event_types on event_types.id=events.event_type_id
      where event_types.type='page_view'
      group by sessions.id
      ),
      first_event as (
      select distinct on (sessions.id) sessions.id as session_id,
      events.tstamp
      from sessions
      inner join events on events.session_id=sessions.id
      order by sessions.id asc, events.id asc
      ),
      last_event as (
      select distinct on (sessions.id) sessions.id as session_id,
      events.tstamp
      from sessions
      inner join events on events.session_id=sessions.id
      order by sessions.id asc, events.id desc
      ),
      first_page as (
      select distinct on (sessions.id) sessions.id as session_id,
      events.page_id
      from events
      inner join sessions on sessions.id=events.session_id
      inner join event_types on event_types.id=events.event_type_id
      where event_types.type='page_view'
      order by sessions.id asc, tstamp asc
      ),
      last_page as (
      select distinct on (sessions.id) sessions.id as session_id,
      events.page_id
      from events
      inner join sessions on sessions.id=events.session_id
      inner join event_types on event_types.id=events.event_type_id
      where event_types.type='page_view'
      order by sessions.id asc, tstamp desc
      )
      select
      sessions.id as session_id,
      domain_users.domain_userid,
      domain_users.contact_id,
      apps.title as app,
      platforms.text as platform,
      case
      when sessions.referer_id is not null then concat(referer_protocols.text,'://',referer_domains.text,referers.path)
      else null
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
      ceil(extract(epoch from (last_event.tstamp - first_event.tstamp))) as duration,
      first_page.page_id as first_page_id,
      last_page.page_id as last_page_id,
      first_event.tstamp as started_at,
      last_event.tstamp as ended_at
      from sessions
      left join pageviews on pageviews.session_id=sessions.id
      left join first_page on first_page.session_id=sessions.id
      left join last_page on last_page.session_id=sessions.id
      inner join first_event on first_event.session_id=sessions.id
      inner join last_event on last_event.session_id=sessions.id
      inner join domain_users on domain_users.id=sessions.domain_user_id
      inner join apps on apps.id=sessions.app_id
      inner join platforms on platforms.id=apps.platform_id
      left join referers on referers.id=sessions.referer_id
      left join protocols referer_protocols on referer_protocols.id=referers.protocol_id
      left join domains referer_domains on referer_domains.id=referers.domain_id
      left join ipaddresses on ipaddresses.id=sessions.ipaddress_id
      left join cities on cities.id=ipaddresses.city_id
      left join regions on regions.id=ipaddresses.region_id
      left join countries on countries.id=ipaddresses.country_id
      left join postal_codes on postal_codes.id=ipaddresses.postal_code_id
      left join metro_codes on metro_codes.id=ipaddresses.metro_code_id
      left join sources on sources.id=sessions.source_id
      left join mediums on mediums.id=sessions.medium_id
      left join campaigns on campaigns.id=sessions.campaign_id
      left join terms on terms.id=sessions.term_id
      left join contents on contents.id=sessions.content_id
      left join networks on networks.id=sessions.network_id
      left join useragents on useragents.id=sessions.useragent_id
      left join devices on devices.id=useragents.device_id
      left join manufacturers on manufacturers.id=useragents.manufacturer_id
      left join oses on oses.id=useragents.os_id
      left join versions os_versions on os_versions.id=useragents.os_version_id
      left join browsers on browsers.id=useragents.browser_id
      left join versions browser_versions on browser_versions.id=useragents.browser_version_id
    `)
    
  },

  down: async (knex) => {
  }

}

export default CreateSessionDetails
