import csp from 'express-csp-header'
import express from 'express'
import show from './show'

const server = express()

server.use(csp({
  policies: {
    'default-src': [csp.SELF],
    'script-src': [csp.SELF, csp.INLINE, 'https://*'],
    'style-src': [csp.SELF, csp.INLINE,'https://*'],
    'img-src': [csp.SELF, csp.INLINE,'https://*','data:'],
    'font-src': [csp.SELF, csp.INLINE,'https://fonts.gstatic.com','data:'],
    'connect-src': [csp.SELF, csp.INLINE,'https://*:*','wss://*:*'],
    'frame-src': [csp.SELF, csp.INLINE,'https://*']
  }
}))

server.get('/forms/:code', show)

server.get('/:code', show)

export default server
