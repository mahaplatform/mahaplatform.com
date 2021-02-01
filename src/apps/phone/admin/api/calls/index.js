import transfer from './transfer'
import { Router } from 'express'
import hangup from './hangup'
import lookup from './lookup'
import create from './create'
import token from './token'
import unhold from './unhold'
import hold from './hold'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.post('/hangup', hangup)

router.post('/hold', hold)

router.post('/unhold', unhold)

router.post('/lookup', lookup)

router.post('/transfer', transfer)

router.get('/token', token)

export default router
