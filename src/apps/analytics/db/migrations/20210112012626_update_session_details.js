const UpdateSessionDetails = {

  databaseName: 'analytics',

  up: async (knex) => {

    await knex.raw('drop view session_details')
    
    await knex.raw(`
      create view session_details as (
      with pageviews as (
      select sessions.id as session_id,
      count(events.*) as pageviews
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
      pageviews.pageviews,
      first_event.tstamp as first_event_tstamp,
      last_event.tstamp as last_event_tstamp,
      first_page.page_id as first_page_id,
      last_page.page_id as last_page_id,
      ceil(extract(epoch from (last_event.tstamp - first_event.tstamp))) as duration
      from sessions
      inner join pageviews on pageviews.session_id=sessions.id
      inner join first_event on first_event.session_id=sessions.id
      inner join last_event on last_event.session_id=sessions.id
      inner join first_page on first_page.session_id=sessions.id
      inner join last_page on last_page.session_id=sessions.id
      )
    `)
  },

  down: async (knex) => {
  }

}

export default UpdateSessionDetails
