import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import update from './update'
import edit from './edit'
import show from './show'
import design from './design'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.use('/:campaign_id/design', design)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
