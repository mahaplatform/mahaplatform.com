import preferences from './preferences'
import activities from './activities'
import { Router } from 'express'
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

router.use('/:id/notes', notes)

router.get('/:id/preferences', preferences)

export default router
