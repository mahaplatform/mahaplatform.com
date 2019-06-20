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
  const ifmatch = req.headers['If'].match(/\(<(.*)>\)/)
  if(ifmatch) {
    req.if = ifmatch[1]
  }
  if(req.headers['Lock-Token']) {
    req.lock_token = req.headers['Lock-Token']
  }
  next()
})

router.use(loadItem)

router.use(async (req, res, next) => {
  console.log(req.headers)
  console.log(`${req.method} ${req.originalUrl}`)
  console.log(req.rawBody)
  next()
})

router.options(options)

router.unlock(unlock)

router.lock(lock)

router.put(move)

router.put(copy)

router.get(get)

router.put(put)

router.use(async (req, res, next) => {
  if(req.method === 'PROPFIND') return propfind(req, res, next)
  next()
})

export default router
