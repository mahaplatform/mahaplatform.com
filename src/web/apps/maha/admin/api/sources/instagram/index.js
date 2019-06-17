import authorize from './authorize'
import { Router } from 'express'
import create from './create'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/authorize', authorize)

router.get('/photos', list)

router.post('/photos', create)

export default router
