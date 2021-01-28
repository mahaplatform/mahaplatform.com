import transfer from './transfer'
import { Router } from 'express'
import lookup from './lookup'
import create from './create'
import token from './token'
import hold from './hold'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.post('/lookup', lookup)

router.post('/transfer', transfer)

router.post('/hold', hold)

router.get('/token', token)

export default router
