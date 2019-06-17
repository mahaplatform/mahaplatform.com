import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import update from './update'
import show from './show'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.get('/:code', show)

router.patch('/:code', update)

router.delete('/:code', destroy)

export default router
