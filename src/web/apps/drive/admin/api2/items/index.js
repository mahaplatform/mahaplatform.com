import { Router } from 'express'
import transfer from './transfer'
import restore from './restore'
import destroy from './destroy'
import trash from './trash'
import list from './list'
import show from './show'
import move from './move'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/transfer', transfer)

router.get('/:code', show)

router.patch('/:code/move', move)

router.patch('/:code/restore', restore)

router.patch('/:code/destroy', destroy)

router.patch('/:code/trash', trash)

export default router
