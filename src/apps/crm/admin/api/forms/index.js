import performance from './performance'
import workflows from './workflows'
import responses from './responses'
import activate from './activate'
import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import update from './update'
import emails from './emails'
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.get('/:id/performance', performance)

router.patch('/:id/activate', activate)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.get('/:form_id/emails', workflows)

router.use('/:form_id/responses', responses)

router.get('/:form_id/workflows', workflows)

export default router
