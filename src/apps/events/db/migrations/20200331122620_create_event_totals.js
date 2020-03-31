const CreateEventTotals = {

  up: async (knex) => {
    await knex.raw(`
      create view events_event_totals as
      with registrations as (
      select event_id,
      count(*) as total
      from events_registrations
      group by event_id
      ),
      tickets as (
      select events_registrations.event_id,
      count(*) as total
      from events_tickets
      inner join events_registrations on events_registrations.id=events_tickets.registration_id
      group by events_registrations.event_id
      ),
      waitings as (
      select event_id,
      count(*) as total
      from events_waitings
      group by event_id
      ),
      revenue as (
      select event_id,
      sum(events_registration_totals.revenue) as revenue
      from events_registration_totals
      group by event_id
      ),
      first_registration as (
      select events_registrations.event_id,
      min(events_registrations.created_at) AS created_at
      from events_registrations
      group by event_id
      ),
      last_registration as (
      select events_registrations.event_id,
      max(events_registrations.created_at) AS created_at
      from events_registrations
      group by event_id
      )
      select events_events.id as event_id,
      coalesce(registrations.total, 0) as registrations_count,
      coalesce(tickets.total, 0) as tickets_count,
      coalesce(waitings.total, 0) as waitings_count,
      coalesce(revenue.revenue, 0.00) as revenue,
      first_registration.created_at AS first_registration,
      last_registration.created_at AS last_registration
      from events_events
      left join registrations on registrations.event_id=events_events.id
      left join tickets on tickets.event_id=events_events.id
      left join waitings on waitings.event_id=events_events.id
      left join revenue on waitings.event_id=events_events.id
      left join first_registration on first_registration.event_id=events_events.id
      left join last_registration on last_registration.event_id=events_events.id
    `)
  },

  down: async (knex) => {
  }

}

export default CreateEventTotals
