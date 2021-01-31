import transfer from './transfer'
import { Router } from 'express'
import hangup from './hangup'
import lookup from './lookup'
import create from './create'
import token from './token'
import hold from './hold'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.post('/hangup', hangup)

router.post('/lookup', lookup)

router.post('/transfer', transfer)

router.post('/hold', hold)

router.get('/token', token)

export default router
