import { Router } from 'express'
import signin from './signin'
import signup from './signup'
import reset from './reset'

const router = new Router({ mergeParams: true })

router.post('/reset', reset)

router.post('/signin', signin)

router.post('/signup', signup)

export default router
