import 'express-async-errors'
import transaction from '@core/lib/express/transaction'
import browserconfig from './browserconfig'
import manifest from './manifest'
import { Router } from 'express'
import sw from './sw'

const router = new Router({ mergeParams: true })

router.get('/sw.js', sw)

router.get('/manifest.json', transaction, manifest)

router.get('/browserconfig.xml', transaction, browserconfig)

export default router
