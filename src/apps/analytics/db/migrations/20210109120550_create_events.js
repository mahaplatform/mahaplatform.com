const CreateEvent = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('events', (table) => {
      table.increments('id').primary()
      table.integer('raw_id').unsigned()
      table.foreign('raw_id').references('raw.id')
      table.integer('session_id').unsigned()
      table.foreign('session_id').references('sessions.id')
      table.integer('event_type_id').unsigned()
      table.foreign('event_type_id').references('event_types.id')
      table.integer('page_id').unsigned()
      table.foreign('page_id').references('pages.id')
      table.integer('action_id').unsigned()
      table.foreign('action_id').references('actions.id')
      table.integer('network_id').unsigned()
      table.foreign('network_id').references('networks.id')
      table.integer('label_id').unsigned()
      table.foreign('label_id').references('labels.id')
      table.integer('property_id').unsigned()
      table.foreign('property_id').references('properties.id')
      table.integer('category_id').unsigned()
      table.foreign('category_id').references('categories.id')
      table.string('event_id')
      table.string('target')
      table.double('value')
      table.string('tr_orderid')
      table.string('tr_affiliation')
      table.decimal('tr_total', 8, 2)
      table.decimal('tr_tax', 8, 2)
      table.string('tr_city')
      table.string('tr_state')
      table.string('tr_country')
      table.string('tr_currency')
      table.string('tr_total_base')
      table.string('tr_tax_base')
      table.string('tr_shipping_base')
      table.string('ti_orderid')
      table.string('ti_sku')
      table.string('ti_name')
      table.string('ti_category')
      table.decimal('ti_price', 8, 2)
      table.integer('ti_quantity')
      table.integer('ti_currency')
      table.integer('ti_price_base')
      table.integer('base_currency')
      table.integer('pp_xoffset_min')
      table.integer('pp_xoffset_max')
      table.integer('pp_yoffset_min')
      table.integer('pp_yoffset_max')
      table.jsonb('data')
      table.timestamp('tstamp')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('events')
  }

}

export default CreateEvent
