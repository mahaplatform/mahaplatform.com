const AddRefundableToLineItems = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('drop view finance_invoice_details')

    await knex.raw('drop view events_event_totals')

    await knex.raw('drop view events_registration_totals')

    await knex.raw('drop view finance_invoice_totals')

    await knex.raw('drop view finance_invoice_subtotals')

    await knex.raw('drop view finance_invoice_line_items')

    await knex.raw(`
      create or replace view finance_invoice_line_items as
      with totals as (
      select finance_line_items.id as line_item_id,
      finance_line_items.quantity * finance_line_items.price as total,
      finance_line_items.quantity * finance_line_items.price * case when finance_line_items.is_tax_deductible then 1 else 0 end as tax_deductible,
      round(finance_line_items.quantity * finance_line_items.price * finance_line_items.tax_rate, 2) as tax,
      case
      when finance_line_items.discount_amount is not null then finance_line_items.discount_amount
      when finance_line_items.discount_percent is not null then round(finance_line_items.quantity * finance_line_items.price * finance_line_items.discount_percent, 2)
      else 0.00
      end as discount
      from finance_line_items
      ),
      refunded as (
      select finance_line_items.id as line_item_id,
      coalesce(sum(finance_allocations.total), 0.00) as total
      from finance_line_items
      left join finance_allocations on finance_allocations.line_item_id=finance_line_items.id and finance_allocations.refund_id is not null
      group by finance_line_items.id
      )
      select finance_line_items.id as line_item_id,
      finance_line_items.invoice_id,
      finance_line_items.delta,
      0 as product_id,
      finance_line_items.project_id,
      finance_line_items.revenue_type_id,
      finance_line_items.description,
      finance_line_items.quantity,
      finance_line_items.price,
      totals.total,
      totals.tax,
      totals.discount,
      totals.total + totals.tax - totals.discount as allocated,
      refunded.total as refunded,
      finance_line_items.quantity * finance_line_items.price * case when finance_line_items.is_tax_deductible then 1 else 0 end as tax_deductible,
      finance_line_items.is_tax_deductible,
      finance_line_items.created_at
      from finance_line_items
      inner join totals on totals.line_item_id = finance_line_items.id
      inner join refunded on refunded.line_item_id = finance_line_items.id
      order by id desc
    `)

    await knex.raw(`
      create view finance_invoice_subtotals as
      select finance_invoices.id as invoice_id,
      sum(finance_invoice_line_items.total) as subtotal,
      sum(finance_invoice_line_items.tax) as tax,
      sum(finance_invoice_line_items.tax_deductible) as tax_deductible,
      sum(finance_invoice_line_items.discount) as discount
      from finance_invoices
      inner join finance_invoice_line_items on finance_invoice_line_items.invoice_id = finance_invoices.id
      group by finance_invoices.id;
    `)

    await knex.raw(`
      create view finance_invoice_totals as
      select finance_invoices.id as invoice_id,
      finance_invoice_subtotals.subtotal + finance_invoice_subtotals.tax - finance_invoice_subtotals.discount as total
      from finance_invoices
      inner join finance_invoice_subtotals on finance_invoice_subtotals.invoice_id = finance_invoices.id
      inner join finance_invoice_payments on finance_invoice_payments.invoice_id = finance_invoices.id;
    `)

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

    await knex.raw(`
      create view finance_invoice_details as
      select finance_invoices.id as invoice_id,
      finance_invoice_subtotals.subtotal,
      finance_invoice_subtotals.tax,
      finance_invoice_subtotals.tax_deductible,
      finance_invoice_payments.paid,
      finance_invoice_subtotals.discount,
      finance_invoice_totals.total,
      finance_invoice_totals.total - finance_invoice_payments.paid as balance,
      case
      when finance_invoices.voided_date is not null then 'void'
      when finance_invoice_payments.paid >= finance_invoice_totals.total then 'paid'
      when finance_invoices.due > now() then 'overdue'
      else 'unpaid'
      end as status
      from finance_invoices
      inner join finance_invoice_totals on finance_invoice_totals.invoice_id = finance_invoices.id
      inner join finance_invoice_subtotals on finance_invoice_subtotals.invoice_id = finance_invoices.id
      inner join finance_invoice_payments on finance_invoice_payments.invoice_id = finance_invoices.id;
    `)

  },

  down: async (knex) => {
  }

}

export default AddRefundableToLineItems
