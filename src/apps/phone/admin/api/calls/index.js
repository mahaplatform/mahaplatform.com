import { Router } from 'express'
import token from './token'
import create from './create'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.get('/token', token)

export default router
