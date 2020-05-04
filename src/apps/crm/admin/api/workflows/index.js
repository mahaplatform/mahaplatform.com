import performance from './performance'
import enrollments from './enrollments'
import contacts from './contacts'
import activate from './activate'
import { Router } from 'express'
import destroy from './destroy'
import enroll from './enroll'
import create from './create'
import update from './update'
import emails from './emails'
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/contacts', contacts)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.get('/:id/emails', emails)

router.get('/:id/performance', performance)

router.patch('/:id/activate', activate)

router.patch('/:id/enroll', enroll)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.use('/:workflow_id/enrollments', enrollments)

export default router
