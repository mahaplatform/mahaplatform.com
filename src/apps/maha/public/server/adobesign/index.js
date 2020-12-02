import { Router } from 'express'
import webhook from './webhook'
import complete from './complete'

const router = new Router({ mergeParams: true })

router.use('/complete', complete)

router.use('/', webhook)

export default router
