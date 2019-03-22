import Knex from 'knex'

const [url, protocol] = process.env.DATABASE_URL.match(/(.*):\/\/\/?(.*)/)

const getClient = (protocol) => {

  switch(protocol) {

  case 'postgres':
    return 'postgresql'

  default:
    return protocol

  }

}

const getConnection = (protocol, url) => {

  switch(protocol) {

  default:
    return url

  }

}

const getPool = (env) => ({
  min: (env === 'test') ? 1 : 5,
  max: (env === 'test') ? 1 : 30
})

const config = {
  client: getClient(protocol),
  connection: getConnection(protocol, url),
  useNullAsDefault: true,
  pool: getPool(process.env.NODE_ENV)
}

const knex = new Knex(config)

export default knex
