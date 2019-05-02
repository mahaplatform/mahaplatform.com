import { Migration } from 'maha'

const CreateRates = new Migration({

  up: async (knex) => {

    await knex.schema.createTable('expenses_rates', (table) => {
      table.increments('id').primary()
      table.integer('year')
      table.decimal('value', 4, 3)
    })
    
    await knex('expenses_rates').insert([
      {
        year: 2017,
        value: 0.535
      }, {
        year: 2018,
        value: 0.545
      }
    ])
    
  },

  down: async (knex) => {
    return await knex.schema.dropTable('expenses_rates')
  }

})

export default CreateRates
