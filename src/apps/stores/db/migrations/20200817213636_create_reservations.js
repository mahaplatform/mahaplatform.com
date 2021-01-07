const CreateReservations = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw(`
      create view stores_reservations as
      with items as (
      select jsonb_array_elements(data->'items') as item
      from stores_carts
      )
      select stores_variants.id as variant_id,
      coalesce(sum((items.item->>'quantity')::int), 0)::int as inventory_reserved
      from stores_variants
      left join items on items.item->>'code'=stores_variants.code
      group by variant_id
      order by variant_id
    `)

  },

  down: async (knex) => {
  }

}

export default CreateReservations
