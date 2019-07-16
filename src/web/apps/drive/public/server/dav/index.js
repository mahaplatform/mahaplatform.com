import { loadHeaders, loadItem, loadTeam, rawParser } from './utils'
import preconditions from './preconditions'
import bodyParserXML from 'body-parser-xml'
import bodyParser from 'body-parser'
import propfind from './propfind'
import destroy from './destroy'
import unlock from './unlock'
import express from 'express'
import mkcol from './mkcol'
import auth from './auth'
import cors from './cors'
import lock from './lock'
import move from './move'
import copy from './copy'
import put from './put'
import get from './get'

bodyParserXML(bodyParser)

const router = new express()

router.use(bodyParser.xml({ limit: '5mb' }))

router.set('etag', false)

router.use(cors)

router.use('/dav/:subdomain', rawParser)

router.use('/dav/:subdomain', preconditions)

router.use('/dav/:subdomain', loadTeam)

router.use('/dav/:subdomain', auth)

router.use('/dav/:subdomain', loadHeaders)

router.use('/dav/:subdomain', loadItem)

router.use('/dav/:subdomain', async (req, res, next) => {
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

const dav = async (req, res, next) => {
  const agent = req.headers['user-agent'].toLowerCase()
  if(agent.match(/dav/) === null) return next()
  await router(req, res, next)
}

export default dav
