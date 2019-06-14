import memberships from './memberships'
import { Router } from 'express'
import disable from './disable'
import enable from './enable'
import create from './create'
import update from './update'
import show from './show'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.patch('/:id', update)

router.patch('/:id/enable', enable)

router.patch('/:id/disable', disable)

router.use('/:project_id/memberships', memberships)


export default router
