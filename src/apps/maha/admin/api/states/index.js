import counties from './counties'
import { Router } from 'express'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:state/counties', counties)

export default router
