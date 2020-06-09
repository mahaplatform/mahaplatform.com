import { Router } from 'express'
import handled from './handled'
import heard from './heard'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.patch('/:id/handled', handled)

router.patch('/:id/heard', heard)

export default router
