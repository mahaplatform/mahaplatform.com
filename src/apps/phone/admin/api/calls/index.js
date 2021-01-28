import { Router } from 'express'
import lookup from './lookup'
import create from './create'
import update from './update'
import token from './token'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.post('/lookup', lookup)

router.post('/update', update)

router.get('/token', token)

export default router
