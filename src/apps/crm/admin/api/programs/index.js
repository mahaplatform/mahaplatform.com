import templates from './templates'
import workflows from './workflows'
import campaigns from './campaigns'
import { Router } from 'express'
import destroy from './destroy'
import senders from './senders'
import numbers from './numbers'
import topics from './topics'
import create from './create'
import update from './update'
import forms from './forms'
import lists from './lists'
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

router.use('/:program_id/campaigns', campaigns)

router.use('/:program_id/forms', forms)

router.use('/:program_id/lists', lists)

router.use('/:program_id/numbers', numbers)

router.use('/:program_id/senders', senders)

router.use('/:program_id/templates', templates)

router.use('/:program_id/topics', topics)

router.use('/:program_id/workflows', workflows)

export default router
