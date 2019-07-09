import { Router } from 'express'
import create from './create'

const router = new Router({ mergeParams: true })

router.post('/', create)

export default router
