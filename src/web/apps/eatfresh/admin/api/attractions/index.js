import { Router } from 'express'
import approve from './approve'
import reject from './reject'
import create from './create'
import update from './update'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.patch('/:id', update)

router.patch('/:id/approve', approve)

router.patch('/:id/reject', reject)

export default router
