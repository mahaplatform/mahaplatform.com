import memberships from './memberships'
import { Router } from 'express'
import disable from './disable'
import enable from './enable'
import create from './create'
import update from './update'
import merge from './merge'
import edit from './edit'
import show from './show'
import list from './list'
import tax from './tax'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/tax', tax)

router.get('/:id', show)

router.patch('/:id', update)

router.get('/:id/edit', edit)

router.patch('/:id/enable', enable)

router.patch('/:id/disable', disable)

router.patch('/:id/merge', merge)

router.use('/:project_id/memberships', memberships)

export default router
