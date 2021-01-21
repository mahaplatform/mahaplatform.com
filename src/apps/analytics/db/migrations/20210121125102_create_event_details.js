const CreateEventDetails = {

  databaseName: 'analytics',

  up: async (knex) => {

    await knex.raw(`
      create view event_details as
      select events.id as event_id,
      event_types.type as type,
      pages.title as page_title,
      case
      when events.page_id is not null then concat(page_protocols.text,'://',page_domains.text,pages.path)
      else null
      end as page_url,
      pageview_details.duration,
      pageview_details.scrolldepth,
      events.data,
      events.tstamp
      from events
      inner join event_types on event_types.id=events.event_type_id
      left join pages on pages.id=events.page_id
      left join protocols page_protocols on page_protocols.id=pages.protocol_id
      left join domains page_domains on page_domains.id=pages.domain_id
      left join pageview_details on pageview_details.pageview_id=events.id
    `)
  },

  down: async (knex) => {
  }

}

export default CreateEventDetails
