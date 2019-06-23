import { authentication, cors, loadHeaders, loadItem, loadTeam, preconditions, rawParser } from './utils'
import propfind from './propfind'
import { Router } from 'express'
import options from './options'
import destroy from './destroy'
import unlock from './unlock'
import mkcol from './mkcol'
import lock from './lock'
import move from './move'
import copy from './copy'
import put from './put'
import get from './get'

const router = new Router({ mergeParams: true })

router.use(rawParser)

router.use(preconditions)

router.use(cors)

router.use(loadTeam)

router.use(authentication)

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
