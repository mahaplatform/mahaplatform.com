import { Router } from 'express'
import posts from './posts'

const router = new Router({ mergeParams: true })

router.use('/posts', posts)

export default router
