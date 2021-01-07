const FixIsPaid = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.raw('drop view events_event_totals')
    await knex.raw('drop view events_registration_totals')
    await knex.raw(`
      create view events_registration_totals as
      with revenue as (
      select events_registrations.id as registration_id,
      coalesce(finance_invoice_payments.paid, 0.00) AS revenue
      from events_registrations
      left join finance_invoice_payments on finance_invoice_payments.invoice_id=events_registrations.invoice_id
      ),
      invoice as (
      select events_registrations.id as registration_id,
      coalesce(finance_invoice_totals.total, 0.00) as total
      from events_registrations
      left join finance_invoice_totals on finance_invoice_totals.invoice_id=events_registrations.invoice_id
      ),
      tickets as (
      select events_registrations.id as registration_id,
      count(events_tickets.*) AS total
      from events_registrations
      left join events_tickets on events_tickets.registration_id=events_registrations.id
      group by events_registrations.id
      )
      select events_registrations.id as registration_id,
      events_registrations.event_id,
      tickets.total as tickets_count,
      invoice.total,
      revenue.revenue,
      revenue.revenue=invoice.total as is_paid
      from events_registrations
      inner join revenue on revenue.registration_id=events_registrations.id
      inner join invoice on invoice.registration_id=events_registrations.id
      inner join tickets on tickets.registration_id=events_registrations.id
    `)
    await knex.raw(`
      create view events_event_totals as
      with registrations as (
      select event_id,
      count(*) as total
      from events_registrations
      group by event_id
      ),
      first_session as (
      select events_events.id as event_id,
      events_sessions.date
      from events_events
      inner join (
      select *
      from events_sessions
      where id in (
      select min(id)
      from events_sessions
      group by event_id
      )
      ) as events_sessions on events_sessions.event_id=events_events.id
      ),
      last_session as (
      select events_events.id as event_id,
      events_sessions.date
      from events_events
      inner join (
      select *
      from events_sessions
      where id in (
      select max(id)
      from events_sessions
      group by event_id
      )
      ) as events_sessions on events_sessions.event_id=events_events.id
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
      first_session.date as start_date,
      last_session.date as end_date,
      coalesce(registrations.total, 0) as registrations_count,
      coalesce(tickets.total, 0) as tickets_count,
      coalesce(waitings.total, 0) as waitings_count,
      coalesce(revenue.revenue, 0.00) as revenue,
      first_registration.created_at AS first_registration,
      last_registration.created_at AS last_registration
      from events_events
      left join first_session on first_session.event_id=events_events.id
      left join last_session on last_session.event_id=events_events.id
      left join registrations on registrations.event_id=events_events.id
      left join tickets on tickets.event_id=events_events.id
      left join waitings on waitings.event_id=events_events.id
      left join revenue on revenue.event_id=events_events.id
      left join first_registration on first_registration.event_id=events_events.id
      left join last_registration on last_registration.event_id=events_events.id
    `)
  },

  down: async (knex) => {
  }

}

export default FixIsPaid
