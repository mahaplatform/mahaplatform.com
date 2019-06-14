import { Router } from 'express'
import starred from './starred'
import shared from './shared'

const router = new Router({ mergeParams: true })

router.get('/shared', shared)

router.get('/starred', starred)

export default router
