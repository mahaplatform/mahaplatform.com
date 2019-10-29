import { Router } from 'express'
import report from './report'
import create from './create'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/report', report)

router.post('/', create)

router.get('/:id', show)

export default router
