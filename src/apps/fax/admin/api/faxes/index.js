import incoming from './incoming'
import outgoing from './outgoing'
import { Router } from 'express'
import create from './create'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/incoming', incoming)

router.get('/outgoing', outgoing)

router.post('/', create)

router.get('/:id', show)

export default router
