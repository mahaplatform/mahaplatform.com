import { Router } from 'express'
import tickets from './tickets'
import button from './button'
import show from './show'
import ics from './ics'

const router = new Router({ mergeParams: true })

router.get('/button.js', button)

router.get('/:code.ics', ics)

router.get('/:code', show)

router.use('/tickets', tickets)

export default router
