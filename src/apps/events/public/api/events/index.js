import { Router } from 'express'
import registrations from './registrations'

const router = new Router({ mergeParams: true })

router.use('/:code/registrations', registrations)

export default router
