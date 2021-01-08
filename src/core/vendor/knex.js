import Knex from 'knex'

const getPool = (env) => ({
  min: (env === 'test') ? 1 : 5,
  max: (env === 'test') ? 1 : 30
})

const knex = (connection) => new Knex({
  client: 'postgresql',
  connection,
  useNullAsDefault: true,
  pool: getPool(process.env.NODE_ENV)
})

export const maha = knex(process.env.DATABASE_URL)

export const analytics = knex(process.env.ANALYTICS_URL)

export default maha
