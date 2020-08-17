import { Router } from 'express'
import update from './update'
import create from './create'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.patch('/:code', update)

export default router
