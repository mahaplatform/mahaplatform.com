import subscriptions from './subscriptions'
import question from './question'
import password from './password'
import { Router } from 'express'
import alerts from './alerts'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', show)

router.patch('/question', question)

router.patch('/password', password)

router.get('/alerts', alerts)

router.patch('/alerts', subscriptions)

export default router
