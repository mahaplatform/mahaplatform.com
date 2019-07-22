import supervisors from './supervisors'
import employees from './employees'
import { Router } from 'express'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/supervisors', supervisors)

router.get('/employees', employees)

export default router
