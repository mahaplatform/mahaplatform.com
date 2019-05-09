import { loadUser, loadItem, cors } from './utils'
import propfind from './propfind'
import options from './options'
import unlock from './unlock'
import express from 'express'
import auth from 'http-auth'
import lock from './lock'
import put from './put'
import get from './get'

const router = express()

router.use(cors)

router.use(auth.connect(auth.basic({ realm: 'MAHA' }, loadUser)))

router.use(loadItem)

router.use(async (req, res, next) => {
  if(req.method === 'OPTIONS') return options(req, res, next)
  if(req.method === 'PROPFIND') return propfind(req, res, next)
  if(req.method === 'UNLOCK') return unlock(req, res, next)
  if(req.method === 'LOCK') return lock(req, res, next)
  if(req.method === 'PUT') return put(req, res, next)
  if(req.method === 'GET') return get(req, res, next)
  next()
})

export default router
