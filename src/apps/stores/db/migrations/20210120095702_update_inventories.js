const UpdateInventories = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw(`
      create or replace view stores_inventories as
      with instock as (
      select stores_variants.id as variant_id,
      sum(stores_inventory_histories.quantity) as total
      from stores_variants
      left join stores_inventory_histories on stores_inventory_histories.variant_id=stores_variants.id
      group by stores_variants.id
      ),
      cartitems as (
      select jsonb_array_elements(data->'items') as item
      from stores_carts
	    where status='active'
      ),
      reserved as (
      select stores_variants.id as variant_id,
      coalesce(sum((cartitems.item->>'quantity')::int), 0)::int as total
      from stores_variants
      left join cartitems on cartitems.item->>'code'=stores_variants.code
      group by variant_id
      ),
      unfullfilled as (
      select stores_variants.id as variant_id,
      coalesce(count(stores_items.id), 0) as total
      from stores_variants
      left join stores_items on stores_items.variant_id=stores_variants.id and stores_items.status = 'pending'
      group by stores_variants.id
      )
      select stores_variants.id as variant_id,
      (instock.total)::integer as inventory_instock,
      (instock.total - reserved.total - unfullfilled.total)::integer as inventory_onhand,
      (reserved.total)::integer as inventory_reserved,
      (unfullfilled.total)::integer as inventory_unfulfilled
      from stores_variants
      inner join instock on instock.variant_id=stores_variants.id
      inner join unfullfilled on unfullfilled.variant_id=stores_variants.id
      inner join reserved on reserved.variant_id=stores_variants.id
    `)

  },

  down: async (knex) => {
  }

}

export default UpdateInventories
