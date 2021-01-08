const CreateIpaddress = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('ipaddresses', (table) => {
      table.increments('id').primary()
      table.integer('city_id').unsigned()
      table.foreign('city_id').references('cities.id')
      table.integer('region_id').unsigned()
      table.foreign('region_id').references('regions.id')
      table.integer('country_id').unsigned()
      table.foreign('country_id').references('countries.id')
      table.integer('postal_code_id').unsigned()
      table.foreign('postal_code_id').references('postal_codes.id')
      table.integer('metro_code_id').unsigned()
      table.foreign('metro_code_id').references('metro_codes.id')
      table.decimal('latitude', 10, 6)
      table.decimal('longitude', 10, 6)
      table.string('address')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('ipaddresses')
  }

}

export default CreateIpaddress
