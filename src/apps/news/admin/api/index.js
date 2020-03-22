import { Router } from 'express'
import groups from './groups'
import posts from './posts'

const router = new Router({ mergeParams: true })

router.use('/groups', groups)

router.use('/posts', posts)

export default router
