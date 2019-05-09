import share from './server/share'
import dav from './server/dav'

const server = (router) => {

  router.use('/drive/dav', dav)

  router.use('/drive/share', share)

  return router

}

export default server
