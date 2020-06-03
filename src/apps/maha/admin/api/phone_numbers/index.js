import { Router } from 'express'
import token from './token'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/token', token)

export default router
