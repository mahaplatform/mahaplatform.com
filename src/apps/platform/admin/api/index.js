import accounts from './accounts'
import articles from './articles'
import settings from './settings'
import { Router } from 'express'
import queues from './queues'
import assets from './assets'
import teams from './teams'
import banks from './banks'
import apps from './apps'

const router = new Router({ mergeParams: true })

router.use('/accounts', accounts)

router.use('/apps', apps)

router.use('/articles', articles)

router.use('/assets', assets)

router.use('/banks', banks)

router.use('/queues', queues)

router.use('/settings', settings)

router.use('/teams', teams)

export default router
