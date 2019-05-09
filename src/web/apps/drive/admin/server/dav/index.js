import User from '../../../../maha/models/user'
import propfind from './propfind'
import options from './options'
import unlock from './unlock'
import express from 'express'
import auth from 'http-auth'
import lock from './lock'
import put from './put'
import get from './get'

const router = express()

router.use((req, res, next) => {
  res.setHeader('DAV', '1,2')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Expose-Headers', 'DAV, content-length, Allow')
  res.setHeader('MS-Author-Via', 'DAV')
  next()
})

const digest = auth.basic({
  realm: 'MAHA'
}, async (username, password, callback) => {
  const user = await User.where('email', username).fetch()
  const authenticated = user ? user.authenticate(password) : false
  callback(authenticated, user)
})

router.use(auth.connect(digest))

router.use(auth.connect(digest))

router.use((req, res, next) => {
  if(req.method === 'OPTIONS') return options(req, res, next)
  if(req.method === 'PROPFIND') return propfind(req, res, next)
  if(req.method === 'UNLOCK') return unlock(req, res, next)
  if(req.method === 'LOCK') return lock(req, res, next)
  if(req.method === 'PUT') return put(req, res, next)
  if(req.method === 'GET') return get(req, res, next)
  next()
})

export default router
