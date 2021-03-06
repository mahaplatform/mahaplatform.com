import unschedule from './unschedule'
import sessions from './sessions'
import outbound from './outbound'
import activate from './activate'
import { Router } from 'express'
import inbound from './inbound'
import destroy from './destroy'
import create from './create'
import update from './update'
import emails from './emails'
import resend from './resend'
import config from './config'
import edit from './edit'
import send from './send'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/outbound', outbound)

router.get('/inbound', inbound)

router.post('/', create)

router.get('/:id', show)

router.patch('/:id/activate', activate)

router.patch('/:id/config', config)

router.get('/:id/edit', edit)

router.get('/:id/emails', emails)

router.patch('/:id/resend', resend)

router.patch('/:id/send', send)

router.patch('/:id/unschedule', unschedule)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.use('/:campaign_id/sessions', sessions)

export default router
