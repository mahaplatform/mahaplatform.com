import collectObjects from '../../utils/collect_objects'
import express from 'express'
import path from 'path'

const getStaticRoot = () => {
  if(process.env.NODE_ENV === 'production') return path.resolve('dist', 'public', 'admin')
  return path.resolve('src', 'web', 'public')
}

const getIndex = () => {
  if(process.env.NODE_ENV === 'production') return path.resolve('dist', 'public', 'admin', 'index.html')
  return path.resolve('src', 'web', 'apps', 'index.html')
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
