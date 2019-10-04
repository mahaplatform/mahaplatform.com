import { Router } from 'express'
import preview from './preview'
import create from './create'
import show from './show'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.get('/preview', preview)

router.post('/:id', show)

export default router
