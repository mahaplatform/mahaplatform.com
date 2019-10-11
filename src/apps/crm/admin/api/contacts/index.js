import activities from './activities'
import interests from './interests'
import { Router } from 'express'
import channels from './channels'
import destroy from './destroy'
import create from './create'
import update from './update'
import calls from './calls'
import notes from './notes'
import edit from './edit'
import list from './list'
import show from './show'

import voice from './voice'
import sms from './sms'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.use('/:id/activities', activities)

router.use('/:id/calls', calls)

router.use('/:id/channels', channels)

router.use('/:id/interests', interests)

router.use('/:id/notes', notes)

router.post('/:id/sms', sms)

router.post('/:id/voice', voice)

export default router
