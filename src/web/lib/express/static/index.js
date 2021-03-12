import 'express-async-errors'
import browserconfig from './browserconfig'
import manifest from './manifest'
import { Router } from 'express'
import sitemap from './sitemap'
import robots from './robots'
import sw from './sw'

const router = new Router({ mergeParams: true })

router.get('/sw.js', sw)

router.get('/manifest.json', manifest)

router.get('/browserconfig.xml', browserconfig)

router.get('/robots.txt', robots)

router.get('/sitemap.xml', sitemap)

export default router
