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
      select events.*
      from events
      inner join event_types on event_types.id=events.event_type_id
      where event_types.type='page_ping'
      order by events.tstamp desc
      ),
      durations as (
      select distinct on (pagepings.context_id) pageviews.id as pageview_id,
      extract(epoch from (pagepings.tstamp - pageviews.tstamp)) as duration
      from pageviews
      inner join pagepings on pagepings.context_id=pageviews.context_id
      ),
      scrolldepths as (
      select pageviews.id as pageview_id,
      max((pagepings.data->>'y_max')::integer) as scrolldepth
      from pageviews
      inner join pagepings on pagepings.context_id=pageviews.context_id
      group by pageviews.id
      ),
      documents as (
      select pageviews.id as pageview_id,
      min((pagepings.doc_height)::integer) as doc_height
      from pageviews
      inner join pagepings on pagepings.context_id=pageviews.context_id
      group by pageviews.id
      )
      select pageviews.id as pageview_id,
      durations.duration,
      (scrolldepths.scrolldepth::float + pageviews.view_height::float) / documents.doc_height::float as scrolldepth
      from pageviews
      inner join durations on durations.pageview_id=pageviews.id
      inner join scrolldepths on scrolldepths.pageview_id=pageviews.id
      inner join documents on documents.pageview_id=pageviews.id
      )
    `)
  },

  down: async (knex) => {
  }

}

export default CreatePageviewDetails
