import performance from './performance'
import { Router } from 'express'
import destroy from './destroy'
import update from './update'
import edit from './edit'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/:id', show)

router.get('/:id/edit', edit)

router.get('/:id/performance', performance)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
