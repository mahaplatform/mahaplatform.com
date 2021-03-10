import registrations from './registrations'
import { Router } from 'express'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/:code', show)

router.use('/:code/registrations', registrations)

export default router
