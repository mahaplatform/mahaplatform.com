import recordings from './recordings'
import voicemails from './voicemails'
import unschedule from './unschedule'
import activate from './activate'
import workflow from './workflow'
import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import update from './update'
import emails from './emails'
import resend from './resend'
import calls from './calls'
import edit from './edit'
import show from './show'
import send from './send'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.get('/:id/emails', emails)

router.patch('/:id/resend', resend)

router.patch('/:id/activate', activate)

router.patch('/:id/send', send)

router.patch('/:id/unschedule', unschedule)

router.patch('/:id/workflow', workflow)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.use('/:campaign_id/calls', calls)

router.use('/:campaign_id/recordings', recordings)

router.use('/:campaign_id/voicemails', voicemails)

export default router
