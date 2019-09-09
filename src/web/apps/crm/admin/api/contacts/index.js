import activities from './activities'
import { Router } from 'express'
import consent from './consent'
import destroy from './destroy'
import create from './create'
import update from './update'
import calls from './calls'
import notes from './notes'
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.use('/:id/activities', activities)

router.use('/:id/calls', calls)

router.use('/:id/consent', consent)

router.use('/:id/notes', notes)

export default router
