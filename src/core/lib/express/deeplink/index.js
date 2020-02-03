import { Router } from 'express'
import merchantid from './merchantid'
import android from './android'
import apple from './apple'

const router = new Router({ mergeParams: true })

router.get('/apple-developer-merchantid-domain-association', merchantid)

router.get('/apple-app-site-association', apple)

router.get('/assetlinks.json', android)

export default router
