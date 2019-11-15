import { Router } from 'express'
import token from './token'

const router = new Router({ mergeParams: true })

router.get('/token', token)

export default router
