import { Router } from 'express'
import mt from './mt'

const router = new Router({ mergeParams: true })

router.use('/mt', mt)

export default router
