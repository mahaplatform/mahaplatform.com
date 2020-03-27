import registrations from './registrations'
import sessions from './sessions'
import waitings from './waitings'
import { Router } from 'express'
import tickets from './tickets'
import destroy from './destroy'
import create from './create'
import update from './update'
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

router.use('/:event_id/registrations', registrations)

router.use('/:event_id/sessions', sessions)

router.use('/:event_id/tickets', tickets)

router.use('/:event_id/waitings', waitings)

export default router
