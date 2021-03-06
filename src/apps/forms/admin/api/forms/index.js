import performance from './performance'
import workflows from './workflows'
import responses from './responses'
import workflow from './workflow'
import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import update from './update'
import email from './email'
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.get('/:id/performance', performance)

router.get('/:id/email', email)

router.get('/:id/workflow', workflow)

router.get('/:id/workflows', workflows)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.use('/:form_id/responses', responses)

export default router
