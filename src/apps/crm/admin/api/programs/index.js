import recipients from './recipients'
import templates from './templates'
import { Router } from 'express'
import destroy from './destroy'
import senders from './senders'
import create from './create'
import update from './update'
import access from './access'
import topics from './topics'
import fields from './fields'
import lists from './lists'
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.get('/:id/:purpose/:type/recipients', recipients)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.use('/:program_id/access', access)

router.use('/:program_id/fields', fields)

router.use('/:program_id/lists', lists)

router.use('/:program_id/senders', senders)

router.use('/:program_id/templates', templates)

router.use('/:program_id/topics', topics)

export default router
