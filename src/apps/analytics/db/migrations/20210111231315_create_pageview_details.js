const CreatePageviewDetails = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.raw(`
      create view pageview_details as (
      with pageviews as (
      select events.*
      from events
      inner join event_types on event_types.id=events.event_type_id
      where event_types.type='page_view'
      order by events.tstamp asc
      ),
      pagepings as (
      select events.context_id,
      events.tstamp,
      (events.data->>'y_max')::integer as y_max,
      (events.doc_height)::integer as doc_height
      from events
      inner join event_types on event_types.id=events.event_type_id
      where event_types.type='page_ping'
      order by events.tstamp desc
      ),
      durations as (
      select distinct on (pagepings.context_id) pageviews.id as pageview_id,
      ceil(extract(epoch from (pagepings.tstamp - pageviews.tstamp))) as duration
      from pageviews
      inner join pagepings on pagepings.context_id=pageviews.context_id
      ),
      maxdepths as (
      select pageviews.id as pageview_id,
      max(pagepings.y_max) as maxdepth
      from pageviews
      inner join pagepings on pagepings.context_id=pageviews.context_id
      group by pageviews.id
      ),
      documents as (
      select pageviews.id as pageview_id,
      min(pagepings.doc_height) as doc_height
      from pageviews
      inner join pagepings on pagepings.context_id=pageviews.context_id
      group by pageviews.id
      ),
      scrolldepths as (
      select pageviews.id as pageview_id,
      round(least(((maxdepths.maxdepth + pageviews.view_height) / documents.doc_height::float), 1)::numeric, 2) as scrolldepth
      from pageviews
      inner join maxdepths on maxdepths.pageview_id=pageviews.id
      inner join documents on documents.pageview_id=pageviews.id
      )
      select pageviews.id as pageview_id,
      coalesce(durations.duration, 0) as duration,
      coalesce(scrolldepths.scrolldepth, 0) as scrolldepth
      from pageviews
      left join durations on durations.pageview_id=pageviews.id
      left join scrolldepths on scrolldepths.pageview_id=pageviews.id
      )
    `)
  },

  down: async (knex) => {
  }

}

export default CreatePageviewDetails
