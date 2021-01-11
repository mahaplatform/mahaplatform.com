import Knex from 'knex'

const knex = (connection) => new Knex({
  client: 'postgresql',
  connection,
  useNullAsDefault: true,
  pool: {
    min: 5,
    max: 30
  }
})

export const maha = knex(process.env.DATABASE_URL)

export const analytics = knex(process.env.ANALYTICS_URL)

export default maha
