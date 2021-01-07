const CreateOfferingsAttractions = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('eatfresh_offerings_attractions', (table) => {
      table.integer('offering_id').unsigned()
      table.foreign('offering_id').references('eatfresh_offerings.id')
      table.integer('attraction_id').unsigned()
      table.foreign('attraction_id').references('eatfresh_attractions.id')
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('eatfresh_offerings_attractions')
  }

}

export default CreateOfferingsAttractions
