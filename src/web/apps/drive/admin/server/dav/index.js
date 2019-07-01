import { loadHeaders, loadItem, loadTeam, rawParser } from './utils'
import preconditions from './preconditions'
import propfind from './propfind'
import express from 'express'
import options from './options'
import destroy from './destroy'
import unlock from './unlock'
import mkcol from './mkcol'
import auth from './auth'
import cors from './cors'
import lock from './lock'
import move from './move'
import copy from './copy'
import put from './put'
import get from './get'

const router = new express()

router.set('etag', false)

router.use('/:subdomain', rawParser)

router.use('/:subdomain', preconditions)

router.use('/:subdomain', cors)

router.use('/:subdomain', loadTeam)

router.use('/:subdomain', auth)

router.use('/:subdomain', loadHeaders)

router.use('/:subdomain', loadItem)

router.use('/:subdomain', async (req, res, next) => {
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
