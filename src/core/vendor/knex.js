import Knex from 'knex'

const getPool = (env) => ({
  min: (env === 'test') ? 1 : 5,
  max: (env === 'test') ? 1 : 30
})

const knex = new Knex({
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
  useNullAsDefault: true,
  pool: getPool(process.env.NODE_ENV)
})

export default knex
