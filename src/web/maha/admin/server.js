import signin from './api/signin/server'
import oauth from './api/sources/server'

const server = (router) => {

  router.use(signin)

  router.use(oauth)

  return router

}

export default server
