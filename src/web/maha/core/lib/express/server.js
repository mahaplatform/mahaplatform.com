import { adminDomainMiddleware, publicDomainMiddleware } from './domain'
import collectObjects from '../../utils/collect_objects'
import express from 'express'
import path from 'path'

const _serverSegment = (portal) => {

  const serverFiles = collectObjects(`${portal}/server.js`)

  return serverFiles.reduce((router, serverFile) => {

    return serverFile.default(router)

  }, new express.Router({ mergeParams: true }))

}

const getStaticRoot = () => {

  if(process.env.NODE_ENV === 'production') return path.resolve('dist', 'public', 'admin')

  return path.resolve('src', 'web', 'maha', 'admin', 'public')

}

const getIndex = () => {

  if(process.env.NODE_ENV === 'production') return path.resolve('dist', 'public', 'admin', 'index.html')

  return path.resolve('src', 'web', 'maha', 'admin', 'index.html')

}

export const adminMiddleware = async () => {

  const server = _serverSegment('admin')

  const router = new express.Router({ mergeParams: true })

  router.use('/admin', express.static(getStaticRoot(), { redirect: false }))

  router.use('/admin', adminDomainMiddleware(server))

  router.use('/admin*', (req, res) => res.sendFile(getIndex()))

  return router

}

export const publicMiddleware = async () => {

  const server = _serverSegment('public')

  const router = new express.Router({ mergeParams: true })

  router.use(publicDomainMiddleware(server))

  return router

}
