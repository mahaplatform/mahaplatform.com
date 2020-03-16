import enrollments from './enrollments'
import outbound from './outbound'
import activate from './activate'
import { Router } from 'express'
import inbound from './inbound'
import destroy from './destroy'
import create from './create'
import update from './update'
import edit from './edit'
import show from './show'
import send from './send'

const router = new Router({ mergeParams: true })

router.get('/outbound', outbound)

router.get('/inbound', inbound)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id/activate', activate)

router.patch('/:id/send', send)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.use('/:campaign_id/enrollments', enrollments)

export default router
