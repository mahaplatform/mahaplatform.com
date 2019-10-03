import { Router } from 'express'
import reindex from './reindex'
import create from './create'
import update from './update'
import backup from './backup'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.patch('/:id', update)

router.get('/:id/backup', backup)

router.patch('/:id/reindex', reindex)

export default router
