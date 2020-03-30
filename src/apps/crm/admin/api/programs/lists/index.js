import contacts from './contacts'
import { Router } from 'express'
import create from './create'
import update from './update'
import show from './show'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.get('/:list_id/contacts', contacts)

router.patch('/:id', update)

export default router
