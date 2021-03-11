import 'express-async-errors'
import browserconfig from './browserconfig'
import manifest from './manifest'
import { Router } from 'express'
import sw from './sw'

const router = new Router({ mergeParams: true })

router.get('/sw.js', sw)

router.get('/manifest.json', manifest)

router.get('/browserconfig.xml', browserconfig)

export default router
