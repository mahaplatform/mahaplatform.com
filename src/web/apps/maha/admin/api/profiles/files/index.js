import { Router } from 'express'
import create from './create'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

export default router
