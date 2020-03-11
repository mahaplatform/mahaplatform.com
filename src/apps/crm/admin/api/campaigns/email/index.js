import performance from './performance'
import activities from './activities'
import deliveries from './deliveries'
import workflows from './workflows'
import { Router } from 'express'
import destroy from './destroy'
import bounces from './bounces'
import create from './create'
import update from './update'
import edit from './edit'
import show from './show'
import send from './send'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.get('/:id', show)

router.get('/:id/activities', activities)

router.get('/:id/bounces', bounces)

router.get('/:id/deliveries', deliveries)

router.get('/:id/edit', edit)

router.get('/:id/performance', performance)

router.get('/:id/workflows', workflows)

router.patch('/:id/send', send)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
