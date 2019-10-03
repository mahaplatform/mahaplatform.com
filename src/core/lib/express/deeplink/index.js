import { Router } from 'express'
import android from './android'
import apple from './apple'

const router = new Router({ mergeParams: true })

router.get('/apple-app-site-association', apple)

router.get('/assetlinks.json', android)

export default router
