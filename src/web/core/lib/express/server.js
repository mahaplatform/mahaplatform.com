import collectObjects from '../../utils/collect_objects'
import express from 'express'
import path from 'path'

const devRoot = path.resolve(__dirname,'..','..','admin')

const prodRoot = path.resolve(__dirname,'..','..','..','public','admin')

const getStaticRoot = () => {
  if(process.env.NODE_ENV === 'production') return prodRoot
  return path.join(devRoot,'public')
}

const getIndex = () => {
  if(process.env.NODE_ENV === 'production') return path.join(prodRoot,'index.html')
  return path.join(devRoot,'index.html')
}

const serverMiddleware = () => {
  const files = collectObjects('admin/server')
  const router = new express.Router({ mergeParams: true })
  const server = files.map(file => file.default(router))
  router.use('/admin', express.static(getStaticRoot(), { redirect: false }))
  router.use('/admin', server)
  router.use('/admin*', (req, res) => res.sendFile(getIndex()))
  return router
}

export default serverMiddleware
