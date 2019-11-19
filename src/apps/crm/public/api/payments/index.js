import { Router } from 'express'
import create from './create'
import token from './token'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.get('/token', token)

export default router
