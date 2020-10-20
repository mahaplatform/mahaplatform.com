const CreateInventoryHistories = {

  up: async (knex) => {

    await knex.raw(`
      create view stores_inventory_histories as
      select variant_id,
      quantity,
      created_at
      from stores_adjustments
      union
      select variant_id,
      -1 as quantity,
      created_at
      from stores_items
      where status='fulfilled'
    `)

  },

  down: async (knex) => {}

}

export default CreateInventoryHistories
