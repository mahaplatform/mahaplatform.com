const CreateAllocation = {

  up: async (knex) => {

    await knex.schema.table('finance_line_items', (table) => {
      table.integer('delta')
    })

    await knex.schema.createTable('finance_allocations', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('batch_id').unsigned()
      table.foreign('batch_id').references('finance_batches.id')
      table.integer('payment_id').unsigned()
      table.foreign('payment_id').references('finance_payments.id')
      table.integer('line_item_id').unsigned()
      table.foreign('line_item_id').references('finance_line_items.id')
      table.timestamps()
    })

    await knex.raw('drop view finance_revenues')

    await knex.raw('drop view finance_disbursement_totals')

    await knex.raw('drop view finance_payment_details')

    await knex.raw('drop view finance_invoice_details')

    await knex.raw('drop view events_event_totals')

    await knex.raw('drop view events_registration_totals')

    await knex.raw('drop view finance_invoice_totals')

    await knex.raw('drop view finance_invoice_subtotals')

    await knex.raw('drop view finance_invoice_line_items')

    await knex.raw(`
      create view finance_invoice_line_items as
      with totals as (
      select finance_line_items.id as line_item_id,
      finance_line_items.quantity * finance_line_items.base_price as total,
      finance_line_items.quantity * finance_line_items.base_price * case when finance_line_items.is_tax_deductible then 1 else 0 end as tax_deductible,
      round(finance_line_items.quantity * finance_line_items.base_price * finance_line_items.tax_rate, 2) as tax,
      case
      when finance_line_items.discount_amount is not null then finance_line_items.discount_amount
      when finance_line_items.discount_percent is not null then round(finance_line_items.quantity * finance_line_items.base_price * finance_line_items.discount_percent, 2)
      else 0.00
      end as discount
      from finance_line_items
      )
      select finance_line_items.id as line_item_id,
      finance_line_items.invoice_id,
      finance_line_items.delta,
      finance_line_items.product_id,
      finance_line_items.project_id,
      finance_line_items.revenue_type_id,
      finance_line_items.description,
      finance_line_items.quantity,
      finance_line_items.base_price as price,
      totals.total,
      totals.tax,
      totals.discount,
      totals.total + totals.tax - totals.discount as allocated,
      finance_line_items.quantity * finance_line_items.base_price * case when finance_line_items.is_tax_deductible then 1 else 0 end as tax_deductible,
      finance_line_items.is_tax_deductible,
      finance_line_items.created_at
      from finance_line_items
      inner join totals on totals.line_item_id = finance_line_items.id
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

    await knex.raw(`
      create view finance_payment_details as
      with fees as (
      select finance_payments.id as payment_id,
      case
      when finance_payments.method in ('scholarship','credit','cash') then 0.00
      else round(floor((finance_payments.rate * finance_payments.amount + 0.3) * 100) / 100, 2)
      end as fee
      from finance_payments
      )
      select finance_payments.id as payment_id,
      disbursement_id,
      case
      when finance_payments.method in ('scholarship','credit','cash') then null
      when finance_payments.method='check' then concat('#',finance_payments.reference)
      when finance_payments.method='paypal' then finance_payment_methods.email
      else upper(concat(finance_payment_methods.card_type,'-',finance_payment_methods.last_four))
      end as description,
      fees.fee,
      amount - fees.fee as disbursed
      from finance_payments
      left join finance_payment_methods on finance_payment_methods.id = finance_payments.payment_method_id
      left join fees on fees.payment_id = finance_payments.id
    `)

    await knex.raw(`
      create view finance_disbursement_totals as
      with payments as (
      select finance_disbursements.id as disbursement_id,
      count(distinct finance_payments.*) as count
      from finance_disbursements
      left join finance_payments on finance_payments.disbursement_id=finance_disbursements.id
      group by finance_disbursements.id
      ),
      totals as (
      select finance_disbursements.id as disbursement_id,
      sum(finance_payments.amount) as total
      from finance_disbursements
      left join finance_payments on finance_payments.disbursement_id=finance_disbursements.id
      group by finance_disbursements.id
      ),
      fees as (
      select finance_disbursements.id as disbursement_id,
      sum(finance_payment_details.fee) as total
      from finance_disbursements
      left join finance_payment_details on finance_payment_details.disbursement_id=finance_disbursements.id
      group by finance_disbursements.id
      )
      select finance_disbursements.id as disbursement_id,
      coalesce(payments.count, 0) as payments_count,
      coalesce(totals.total, 0.00) as total,
      coalesce(fees.total, 0.00) as fee,
      coalesce(totals.total - fees.total, 0.00) as amount
      from finance_disbursements
      left join payments on payments.disbursement_id=finance_disbursements.id
      left join totals on totals.disbursement_id=finance_disbursements.id
      left join fees on fees.disbursement_id=finance_disbursements.id
    `)

    await knex.raw(`
      create or replace view finance_allocation_details as
      with percents as (
      select finance_invoice_line_items.line_item_id,
      case
      when finance_invoice_totals.total > 0
      then finance_invoice_line_items.allocated / finance_invoice_totals.total
      else 0
      end as percent
      from finance_invoice_line_items
      inner join finance_invoice_totals on finance_invoice_totals.invoice_id=finance_invoice_line_items.invoice_id
      )
      select finance_allocations.id as allocation_id,
      finance_invoices.customer_id,
      finance_line_items.project_id,
      finance_line_items.revenue_type_id,
      case
      when finance_invoice_line_items.delta=0
      then round(ceil(percents.percent * finance_payment_details.disbursed * 100) / 100, 2)
      else round(floor(percents.percent * finance_payment_details.disbursed * 100) / 100, 2)
      end as amount,
      case
      when finance_invoice_line_items.delta=0
      then round(ceil(percents.percent * finance_payment_details.fee * 100) / 100, 2)
      else round(floor(percents.percent * finance_payment_details.fee * 100) / 100, 2)
      end as fee,
      case
      when finance_invoice_line_items.delta=0
      then round(ceil(percents.percent * finance_payments.amount * 100) / 100, 2)
      else round(floor(percents.percent * finance_payments.amount * 100) / 100, 2)
      end as total
      from finance_allocations
      inner join finance_payments on finance_payments.id=finance_allocations.payment_id
      inner join finance_payment_details on finance_payment_details.payment_id=finance_payments.id
      inner join finance_invoices on finance_invoices.id=finance_payments.invoice_id
      inner join finance_invoice_line_items on finance_invoice_line_items.line_item_id=finance_allocations.line_item_id
      inner join finance_line_items on finance_line_items.id=finance_invoice_line_items.line_item_id
      inner join percents on percents.line_item_id=finance_allocations.line_item_id
    `)


  },

  down: async (knex) => {
    await knex.schema.dropTable('finance_allocations')
  }

}

export default CreateAllocation
