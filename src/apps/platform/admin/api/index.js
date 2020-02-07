import settings from './settings'
import { Router } from 'express'
import assets from './assets'
import teams from './teams'
import apps from './apps'

const router = new Router({ mergeParams: true })

router.use('/apps', apps)

router.use('/assets', assets)

router.use('/settings', settings)

router.use('/teams', teams)

export default router
