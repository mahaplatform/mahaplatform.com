import contacts from './contacts'
import { Router } from 'express'
import destroy from './destroy'
import update from './update'
import edit from './edit'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.get('/:id/contacts', contacts)

export default router
