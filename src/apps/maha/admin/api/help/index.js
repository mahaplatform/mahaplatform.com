import { Router } from 'express'
import articles from './articles'
import changes from './changes'

const router = new Router({ mergeParams: true })

router.use('/articles', articles)

router.use('/changes', changes)

export default router
