import { Router } from 'express'
import question from './question'
import answer from './answer'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', show)

router.get('/question', question)

router.post('/answer', answer)

export default router
