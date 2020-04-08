import { Router } from 'express'
import tickets from './tickets'
import button from './button'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/button.js', button)

router.get('/:code', show)

router.use('/:event_code/tickets', tickets)

export default router
