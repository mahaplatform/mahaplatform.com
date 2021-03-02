import Knex from 'knex'

const knex = new Knex({
  client: 'postgresql',
  connection: process.env.ANALYTICS_URL,
  useNullAsDefault: true,
  pool: {
    min: 5,
    max: 10
  }
})

export default knex
