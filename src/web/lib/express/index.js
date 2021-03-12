import { createProxyMiddleware } from 'http-proxy-middleware'
import staticMiddleware from './static'
import { Router } from 'express'

const getWebRouter = () => {

  const router = new Router({ mergeParams: true })

  router.get('/ping', (req, res) => {
    res.send('pong')
  })

  router.use('/api', createProxyMiddleware({
    secure: false,
    target: process.env.WEB_HOST,
    changeOrigin: true
  }))

  router.use('/imagecache', createProxyMiddleware({
    secure: false,
    target: process.env.WEB_HOST,
    changeOrigin: true
  }))

  router.use('/websites/:code', staticMiddleware)

  return router

}

export default getWebRouter
