import { Router } from 'express'
import transfer from './transfer'
import enqueue from './enqueue'
import hangup from './hangup'

const router = new Router({ mergeParams: true })

router.patch('/:id/enqueue', enqueue)

router.patch('/:id/hangup', hangup)

router.patch('/:id/transfer', transfer)

export default router
