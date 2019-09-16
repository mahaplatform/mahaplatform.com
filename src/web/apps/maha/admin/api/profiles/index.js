import { Router } from 'express'
import destroy from './destroy'
import photos from './photos'
import files from './files'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.delete('/:id', destroy)

router.use('/:id/files', files)

router.use('/:id/photos', photos)

export default router
