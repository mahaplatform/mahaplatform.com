const CreateTotals = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw(`
    create view events_registration_ticket_type_totals as
    with totals as (
    select events_registrations.id as registration_id,
    events_ticket_types.id as ticket_type_id,
    coalesce(count(events_tickets.*), 0) as total
    from events_registrations
    inner join events_ticket_types on events_ticket_types.event_id=events_registrations.event_id
    left join events_tickets on events_tickets.registration_id=events_registrations.id and events_tickets.ticket_type_id=events_ticket_types.id
    group by events_registrations.id,events_ticket_types.id
    )
    select registration_id,
    jsonb_object_agg(ticket_type_id,total) as ticket_type_totals
    from totals
    group by registration_id
    `)

    await knex.raw(`
    create view stores_order_variant_totals as
    with computed as (
    select stores_orders.id as order_id,
    stores_variants.id as variant_id,
    coalesce(count(stores_items.*), 0) as total
    from stores_orders
    inner join stores_products on stores_products.store_id=stores_orders.store_id
    inner join stores_variants on stores_variants.product_id=stores_products.id
    left join stores_items on stores_items.order_id=stores_orders.id and stores_items.variant_id=stores_variants.id
    group by stores_orders.id,stores_variants.id
    )
    select order_id,
    jsonb_object_agg(variant_id,total) as variant_totals
    from computed
    group by order_id
    `)

  },

  down: async (knex) => {
  }

}

export default CreateTotals
