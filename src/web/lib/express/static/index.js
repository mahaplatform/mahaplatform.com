import browserconfig from './browserconfig'
import { Router } from 'express'
import manifest from './manifest'

const router = new Router({ mergeParams: true })

router.get('/manifest.json', manifest)

router.get('/browserconfig.xml', browserconfig)

export default router
