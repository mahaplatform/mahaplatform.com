import { loadUser, loadItem, cors } from './utils'
import propfind from './propfind'
import options from './options'
import unlock from './unlock'
import express from 'express'
import auth from 'http-auth'
import lock from './lock'
import move from './move'
import copy from './copy'
import put from './put'
import get from './get'

const router = express()

router.use(cors)

router.use(auth.connect(auth.basic({
  realm: 'MAHA'
}, loadUser)))

router.use((req, res, next) => {
  if(req.headers['if']) {
    const ifmatch = req.headers['if'].match(/urn:uuid:([^>]*)/)
    if(ifmatch) req.if = ifmatch[1]
  }
  if(req.headers['lock-token']) {
    const token = req.headers['lock-token'].match(/urn:uuid:([^>]*)/)
    if(token) req.lock_token = token[1]
  }
  next()
})

router.use(loadItem)

// router.use(async (req, res, next) => {
//   console.log(req.headers)
//   console.log(`${req.method} ${req.originalUrl}`)
//   console.log(req.rawBody)
//   next()
// })

router.use(async (req, res, next) => {
  if(req.method === 'OPTIONS') return options(req, res, next)
  if(req.method === 'UNLOCK') return unlock(req, res, next)
  if(req.method === 'LOCK') return lock(req, res, next)
  if(req.method === 'MOVE') return move(req, res, next)
  if(req.method === 'COPY') return copy(req, res, next)
  if(req.method === 'GET') return get(req, res, next)
  if(req.method === 'PUT') return put(req, res, next)
  if(req.method === 'PROPFIND') return propfind(req, res, next)
  next()
})

export default router
