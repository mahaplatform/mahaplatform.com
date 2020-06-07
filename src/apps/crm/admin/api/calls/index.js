import { Router } from 'express'
import transfer from './transfer'
import enqueue from './enqueue'
import hangup from './hangup'
import create from './create'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.patch('/:id/enqueue', enqueue)

router.patch('/:id/hangup', hangup)

router.patch('/:id/transfer', transfer)

export default router
