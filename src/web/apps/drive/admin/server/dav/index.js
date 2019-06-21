import { loadUser, loadTeam, loadItem, cors, loadHeaders } from './utils'
import propfind from './propfind'
import options from './options'
import destroy from './destroy'
import unlock from './unlock'
import express from 'express'
import auth from 'http-auth'
import lock from './lock'
import move from './move'
import copy from './copy'
import mkcol from './mkcol'
import put from './put'
import get from './get'

const router = express()

router.use((req, res, next) => {
  if(req.headers.accept !== '*/*' || req.method !== 'PUT') return next()
  const chunks = []
  req.on('data', function(chunk) {
    chunks.push(chunk)
  })
  req.on('end', function(chunk) {
    req.rawBody = Buffer.concat(chunks)
    next()
  })
})

router.use(cors)

router.use(auth.connect(auth.basic({
  realm: 'MAHA'
}, loadUser)))

router.use(loadTeam)

router.use(loadHeaders)

router.use(loadItem)

router.use(async (req, res, next) => {
  if(req.method === 'OPTIONS') return options(req, res, next)
  if(req.method === 'UNLOCK') return unlock(req, res, next)
  if(req.method === 'LOCK') return lock(req, res, next)
  if(req.method === 'MOVE') return move(req, res, next)
  if(req.method === 'COPY') return copy(req, res, next)
  if(req.method === 'GET') return get(req, res, next)
  if(req.method === 'PUT') return put(req, res, next)
  if(req.method === 'DELETE') return destroy(req, res, next)
  if(req.method === 'PROPFIND') return propfind(req, res, next)
  if(req.method === 'MKCOL') return mkcol(req, res, next)
  next()
})

export default router
