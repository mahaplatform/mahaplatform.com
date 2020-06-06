import { Router } from 'express'
import enqueue from './enqueue'
import hangup from './hangup'

const router = new Router({ mergeParams: true })

router.patch('/:id/enqueue', enqueue)

router.patch('/:id/hangup', hangup)

export default router
