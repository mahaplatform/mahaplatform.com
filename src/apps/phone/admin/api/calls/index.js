import { Router } from 'express'
import lookup from './lookup'
import create from './create'
import token from './token'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.post('/lookup', lookup)

router.get('/token', token)

export default router
