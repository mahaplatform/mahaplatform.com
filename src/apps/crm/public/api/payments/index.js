import { Router } from 'express'
import create from './create'
import token from './token'
import test from './test'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.get('/token', token)

router.get('/test/:id', test)

export default router
