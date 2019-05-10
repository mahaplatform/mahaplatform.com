import signin from './signin'
import oauth from './sources'

const server = (router) => {

  router.use(signin)

  router.use(oauth)

  return router

}

export default server
