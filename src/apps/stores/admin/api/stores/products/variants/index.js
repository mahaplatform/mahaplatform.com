import { Router } from 'express'
import destroy from './destroy'
import update from './update'
import photos from './photos'
import edit from './edit'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/:id', show)

router.get('/:id/edit', edit)

router.get('/:id/photos', photos)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
