const CreateUserDetails = {

  databaseName: 'analytics',

  up: async (knex) => {

    await knex.raw(`
      create view domain_user_details as (
      with
      first_page as (
      select distinct on (sessions.domain_user_id) sessions.domain_user_id as domain_user_id,
      events.page_id
      from events
      inner join sessions on sessions.id=events.session_id
      inner join event_types on event_types.id=events.event_type_id
      where event_types.type='page_view'
      order by sessions.domain_user_id asc, tstamp asc
      ),
      last_page as (
      select distinct on (sessions.domain_user_id) sessions.domain_user_id as domain_user_id,
      events.page_id
      from events
      inner join sessions on sessions.id=events.session_id
      inner join event_types on event_types.id=events.event_type_id
      where event_types.type='page_view'
      order by sessions.domain_user_id asc, tstamp desc
      )
      select
      domain_users.id as domain_domain_user_id,
      first_page.page_id as first_page_id,
      last_page.page_id as last_page_id
      from domain_users
      inner join first_page on first_page.domain_user_id=domain_users.id
      inner join last_page on last_page.domain_user_id=domain_users.id
      )
    `)

  },

  down: async (knex) => {
  }

}

export default CreateUserDetails
