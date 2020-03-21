import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import update from './update'
import likes from './likes'
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.use('/:post_id/likes', likes)

export default router
