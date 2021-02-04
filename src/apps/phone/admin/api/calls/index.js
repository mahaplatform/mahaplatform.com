import transfer from './transfer'
import { Router } from 'express'
import forward from './forward'
import hangup from './hangup'
import lookup from './lookup'
import create from './create'
import unhold from './unhold'
import token from './token'
import hold from './hold'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.post('/forward', forward)

router.post('/hangup', hangup)

router.post('/hold', hold)

router.post('/unhold', unhold)

router.post('/lookup', lookup)

router.post('/transfer', transfer)

router.get('/token', token)

router.get('/:id', show)

export default router
