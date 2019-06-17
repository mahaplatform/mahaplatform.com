import { Router } from 'express'
import chat from './chat'
import email from './email'

const router = new Router({ mergeParams: true })

router.post('/chat', chat)

router.post('/email', email)

export default router
