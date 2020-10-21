const CreateOrderTotals = {

  up: async (knex) => {

    await knex.raw(`
      create view stores_order_totals as
      with revenue as (
      select stores_orders.id as order_id,
      coalesce(finance_invoice_payments.paid, 0.00) as revenue
      from stores_orders
      left join finance_invoice_payments on finance_invoice_payments.invoice_id = stores_orders.invoice_id
      ),
      invoice as (
      select stores_orders.id as order_id,
      coalesce(finance_invoice_totals.total, 0.00) as total
      from stores_orders
      left join finance_invoice_totals on finance_invoice_totals.invoice_id = stores_orders.invoice_id
      ),
      items as (
      select stores_orders.id as order_id,
      count(stores_items.*) as total
      from stores_orders
      left join stores_items on stores_items.order_id = stores_orders.id
      group by stores_orders.id
      )
      select stores_orders.id as order_id,
      stores_orders.store_id,
      items.total as items_count,
      invoice.total,
      revenue.revenue,
      revenue.revenue = invoice.total as is_paid
      from stores_orders
      join revenue on revenue.order_id = stores_orders.id
      join invoice on invoice.order_id = stores_orders.id
      join items on items.order_id = stores_orders.id
    `)

  },

  down: async (knex) => {
  }

}

export default CreateOrderTotals
