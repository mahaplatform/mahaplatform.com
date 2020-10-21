const CreateStoreTotals = {

  up: async (knex) => {

    await knex.raw(`
      create view stores_store_totals as
      with abandoned as (
      select stores_stores.id as store_id,
      count(stores_carts.*) as total
      from stores_stores
      left join stores_carts on stores_carts.store_id=stores_stores.id and stores_carts.status='abandoned'
      group by stores_stores.id
      ), active as (
      select stores_stores.id as store_id,
      count(stores_carts.*) as total
      from stores_stores
      left join stores_carts on stores_carts.store_id=stores_stores.id and stores_carts.status='active'
      group by stores_stores.id
      ), orders as (
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
      )
      select stores_stores.id as store_id,
      abandoned.total as abandoned_count,
      active.total as active_count,
      orders.total as orders_count,
      revenue.revenue,
      first_order.created_at as first_order,
      last_order.created_at as last_order
      from stores_stores
      inner join abandoned on abandoned.store_id=stores_stores.id
      inner join active on active.store_id=stores_stores.id
      inner join orders on orders.store_id=stores_stores.id
      inner join revenue on revenue.store_id = stores_stores.id
      inner join first_order on first_order.store_id = stores_stores.id
      inner join last_order on last_order.store_id = stores_stores.id
    `)

  },

  down: async (knex) => {
  }

}

export default CreateStoreTotals
