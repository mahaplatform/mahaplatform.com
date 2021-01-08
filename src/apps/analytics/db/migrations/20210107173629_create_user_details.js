const CreateUserDetails = {

  databaseName: 'analytics',

  up: async (knex) => {

    await knex.raw(`
      create view user_details as (
      with
      first_page as (
      select distinct on (sessions.user_id) sessions.user_id as user_id,
      events.page_id
      from events
      inner join sessions on sessions.id=events.session_id
      inner join event_types on event_types.id=events.event_type_id
      where event_types.type='page_view'
      order by sessions.user_id asc, tstamp asc
      ),
      last_page as (
      select distinct on (sessions.user_id) sessions.user_id as user_id,
      events.page_id
      from events
      inner join sessions on sessions.id=events.session_id
      inner join event_types on event_types.id=events.event_type_id
      where event_types.type='page_view'
      order by sessions.user_id asc, tstamp desc
      )
      select
      users.id as user_id,
      first_page.page_id as first_page_id,
      last_page.page_id as last_page_id
      from users
      inner join first_page on first_page.user_id=users.id
      inner join last_page on last_page.user_id=users.id
      )
    `)

  },

  down: async (knex) => {
  }

}

export default CreateUserDetails
