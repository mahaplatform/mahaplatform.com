import { loadHeaders, loadTeam, rawParser } from './utils'
import collectObjects from '../../../utils/collect_objects'
import preconditions from './preconditions'
import bodyParserXML from 'body-parser-xml'
import bodyParser from 'body-parser'
import express from 'express'
import auth from './auth'
import cors from './cors'

const davFiles = collectObjects('hooks/dav/index.js')

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

davFiles.map(davfile => {

  router.use('/dav/:subdomain', davfile.default)

})

const dav = async (req, res, next) => {
  const agent = req.headers['user-agent'] ? req.headers['user-agent'].toLowerCase() : ''
  if(agent.match(/dav/) === null) return next()
  await router(req, res, next)
}

export default dav
