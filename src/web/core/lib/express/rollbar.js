import Rollbar from '../../services/rollbar'
import knex from '../../services/knex'

const rollbar = (req, res, next) => {

  Rollbar.configure({
    payload: null
  })

  try {

    const { pool } = knex.default.client

    Rollbar.configure({
      payload: {
        pool: {
          activeQueries: pool._inUseObjects.map(object => {
            return object.activeQuery
          }).filter(query => {
            return query !== undefined
          })
        },
        request: {
          headers: req.headers,
          params: req.params,
          query: req.query,
          body: req.body,
          url: req.url
        }
      }
    })

  } catch(e) {}

  next()

}

export default rollbar
