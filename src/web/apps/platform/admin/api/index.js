import { Router } from 'express'
import assets from './assets'
import teams from './teams'
import apps from './apps'

const router = new Router({ mergeParams: true })

router.use('/assets', assets)

router.use('/teams', teams)

router.use('/apps', apps)

export default router
