import { Router } from 'express'
import create from './create'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/upload', show)

router.post('/upload', create)

export default router
