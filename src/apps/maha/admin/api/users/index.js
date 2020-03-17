import supervisors from './supervisors'
import employees from './employees'
import { Router } from 'express'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.get('/supervisors', supervisors)

router.get('/employees', employees)

export default router
