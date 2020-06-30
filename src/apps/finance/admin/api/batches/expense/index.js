import { Router } from 'express'
import create from './create'
import show from './show'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.get('/:id', show)

export default router
