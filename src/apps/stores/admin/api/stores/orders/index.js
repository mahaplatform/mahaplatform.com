import { Router } from 'express'
import fulfill from './fulfill'
import destroy from './destroy'
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id/fulfill', fulfill)

router.delete('/:id', destroy)

export default router
