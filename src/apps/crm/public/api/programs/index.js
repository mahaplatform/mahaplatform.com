import { Router } from 'express'
import topics from './topics'

const router = new Router({ mergeParams: true })

router.get('/:program_id/topics', topics)

export default router
