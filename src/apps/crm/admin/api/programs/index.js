import { Router } from 'express'
import destroy from './destroy'
import senders from './senders'
import create from './create'
import update from './update'
import access from './access'
import topics from './topics'
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

router.use('/:program_id/access', access)

router.use('/:program_id/senders', senders)

router.use('/:program_id/topics', topics)

export default router
