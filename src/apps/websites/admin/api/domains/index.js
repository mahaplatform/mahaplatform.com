import { Router } from 'express'
import destroy from './destroy'
import records from './records'
import lookup from './lookup'
import create from './create'
import update from './update'
import check from './check'
import edit from './edit'
import list from './list'
import show from './show'
import auth from './auth'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/auth', auth)

router.get('/lookup', lookup)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id', update)

router.get('/:id/check', check)

router.delete('/:id', destroy)

router.use('/:domain_id/records', records)

export default router
