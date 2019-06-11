import { Router } from 'express'
import resend from './resend'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.patch('/:id/resend', resend)

export default router
