import { Router } from 'express'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', show)

export default router
