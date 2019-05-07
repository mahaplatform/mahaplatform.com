import collectObjects from '../../utils/collect_objects'
import express from 'express'
import path from 'path'

const devRoot = path.resolve('src','web')

const prodRoot = path.resolve(__dirname,'..','..','..','public','admin')

const getStaticRoot = () => {
  if(process.env.NODE_ENV === 'production') return prodRoot
  return path.join(devRoot,'public')
}

const getIndex = () => {
  if(process.env.NODE_ENV === 'production') return path.join(prodRoot,'index.html')
  return path.join(devRoot,'apps','index.html')
}

const serverMiddleware = () => {
  const files = collectObjects('admin/server.js')
  const router = new express.Router({ mergeParams: true })
  const server = files.map(file => file.default(router))
  router.use('/', express.static(getStaticRoot(), { redirect: false }))
  router.use('/', server)
  router.use('/*', (req, res) => res.sendFile(getIndex()))
  return router
}

export default serverMiddleware
