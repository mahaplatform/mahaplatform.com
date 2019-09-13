import { Router } from 'express'
import destroy from './destroy'
import files from './files'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.delete('/:id', destroy)

router.use('/:id/files', files)

export default router
