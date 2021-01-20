const UpdateTotals = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('drop view stores_store_totals')

    await knex.raw('drop view stores_order_totals')

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
      ),
      unfulfilled as (
      select stores_orders.id as order_id,
      count(stores_items.*) as total
      from stores_orders
      inner join stores_items on stores_items.order_id=stores_orders.id
      where stores_items.status='pending'
      group by stores_orders.id
      )
      select stores_orders.id as order_id,
      stores_orders.store_id,
      items.total as items_count,
      coalesce(unfulfilled.total, 0) as unfulfilled_count,
      coalesce(invoice.total, 0.00) as total,
      coalesce(revenue.revenue, 0.00) as revenue,
      revenue.revenue = invoice.total as is_paid
      from stores_orders
      left join unfulfilled on unfulfilled.order_id=stores_orders.id
      left join revenue on revenue.order_id = stores_orders.id
      left join invoice on invoice.order_id = stores_orders.id
      inner join items on items.order_id = stores_orders.id
    `)

    await knex.raw(`
      create view stores_store_totals as
      with abandoned as (
      select stores_stores.id as store_id,
      count(stores_carts.*) as total
      from stores_stores
      left join stores_carts on stores_carts.store_id=stores_stores.id and stores_carts.status='abandoned'
      group by stores_stores.id
      ),
      active as (
      select stores_stores.id as store_id,
      count(stores_carts.*) as total
      from stores_stores
      left join stores_carts on stores_carts.store_id=stores_stores.id and stores_carts.status='active'
      group by stores_stores.id
      ),
      orders as (
      select stores_stores.id as store_id,
      count(stores_orders.*) as total
      from stores_stores
      left join stores_orders on stores_orders.store_id=stores_stores.id
      group by stores_stores.id
      ),
      revenue as (
      select stores_order_totals.store_id,
      sum(stores_order_totals.revenue) AS revenue
      from stores_order_totals
      group by stores_order_totals.store_id
      ),
      first_order as (
      select stores_orders.store_id,
      min(stores_orders.created_at) AS created_at
      from stores_orders
      group by store_id
      ),
      last_order as (
      select stores_orders.store_id,
      max(stores_orders.created_at) AS created_at
      from stores_orders
      group by store_id
      ),
      unfulfilled as (
      select stores_stores.id as store_id,
      count(stores_items.*) as total
      from stores_stores
      inner join stores_orders on stores_orders.store_id=stores_stores.id
      inner join stores_items on stores_items.order_id=stores_orders.id
      where stores_items.status='pending'
      group by stores_stores.id
      )
      select stores_stores.id as store_id,
      coalesce(abandoned.total, 0) as abandoned_count,
      coalesce(active.total, 0) as active_count,
      coalesce(orders.total, 0) as orders_count,
      coalesce(unfulfilled.total, 0) as unfulfilled_count,
      coalesce(revenue.revenue, 0.00),
      first_order.created_at as first_order,
      last_order.created_at as last_order
      from stores_stores
      left join abandoned on abandoned.store_id=stores_stores.id
      left join active on active.store_id=stores_stores.id
      left join orders on orders.store_id=stores_stores.id
      left join unfulfilled on unfulfilled.store_id=stores_stores.id
      left join revenue on revenue.store_id = stores_stores.id
      left join first_order on first_order.store_id = stores_stores.id
      left join last_order on last_order.store_id = stores_stores.id
    `)

  },

  down: async (knex) => {
  }

}

export default UpdateTotals
