import { Router } from 'express'
import starred from './starred'
import search from './search'
import unread from './unread'

const router = new Router({ mergeParams: true })

router.use('/starred', starred)

router.use('/search', search)

router.use('/unread', unread)

export default router
