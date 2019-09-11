import { Router } from 'express'
import lookup from './lookup'

const router = new Router({ mergeParams: true })

router.get('/lookup', lookup)

export default router
