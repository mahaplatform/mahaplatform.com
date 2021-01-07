const CreateCartItems = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw(`
      create view stores_cart_items as
      with items as (
      select
      id as cart_id,
      jsonb_array_elements(data->'items') as data
      from stores_carts
      )
      select
      items.cart_id,
      stores_variants.id as variant_id,
      (items.data->>'price')::decimal(6,2) as price,
      (items.data->>'quantity')::integer as quantity
      from items
      inner join stores_variants on stores_variants.code=items.data->>'code'
    `)

  },

  down: async (knex) => {
  }

}

export default CreateCartItems
