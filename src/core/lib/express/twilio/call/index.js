import { Router } from 'express'
import receive from './receive'

const router = new Router({ mergeParams: true })

router.post('/', receive)

export default router
