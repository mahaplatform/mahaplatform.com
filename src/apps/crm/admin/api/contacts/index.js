import subscriptions from './subscriptions'
import activities from './activities'
import interests from './interests'
import { Router } from 'express'
import channels from './channels'
import destroy from './destroy'
import emails from './emails'
import create from './create'
import update from './update'
import batch from './batch'
import calls from './calls'
import notes from './notes'
import edit from './edit'
import list from './list'
import show from './show'

import sms from './sms'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.post('/batch', batch)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.use('/:id/activities', activities)

router.use('/:id/calls', calls)

router.use('/:id/channels', channels)

router.use('/:id/emails', emails)

router.get('/:id/interests', interests)

router.get('/:id/subscriptions', subscriptions)

router.use('/:id/notes', notes)

router.post('/:id/sms', sms)

export default router
