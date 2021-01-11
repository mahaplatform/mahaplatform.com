const AddColumns = {

  databaseName: 'analytics',

  up: async (knex) => {

    await knex.schema.table('events', (table) => {
      table.dropColumn('action_id')
      table.dropColumn('network_id')
      table.dropColumn('label_id')
      table.dropColumn('property_id')
      table.dropColumn('category_id')
      table.dropColumn('tr_orderid')
      table.dropColumn('tr_affiliation')
      table.dropColumn('tr_total')
      table.dropColumn('tr_shipping')
      table.dropColumn('tr_tax')
      table.dropColumn('tr_city_id')
      table.dropColumn('tr_state_id')
      table.dropColumn('tr_country_id')
      table.dropColumn('ti_orderid')
      table.dropColumn('ti_sku')
      table.dropColumn('ti_name')
      table.dropColumn('ti_category_id')
      table.dropColumn('ti_price')
      table.dropColumn('ti_quantity')
      table.dropColumn('pp_xoffset_min')
      table.dropColumn('pp_xoffset_max')
      table.dropColumn('pp_yoffset_min')
      table.dropColumn('pp_yoffset_max')
      table.dropColumn('target')
      table.dropColumn('value')
      table.integer('doc_width')
      table.integer('doc_height')
      table.integer('view_width')
      table.integer('view_height')
      table.jsonb('data')
    })

    await knex.schema.dropTable('actions')
    await knex.schema.dropTable('categories')
    await knex.schema.dropTable('labels')
    await knex.schema.dropTable('properties')

  },

  down: async (knex) => {
  }

}

export default AddColumns
