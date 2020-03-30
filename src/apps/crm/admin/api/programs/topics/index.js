import contacts from './contacts'
import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import update from './update'
import show from './show'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.get('/:topic_id/contacts', contacts)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
