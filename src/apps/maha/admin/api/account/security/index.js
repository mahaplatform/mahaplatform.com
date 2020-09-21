import question from './question'
import password from './password'
import { Router } from 'express'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', show)

router.patch('/question', question)

router.patch('/password', password)

export default router
