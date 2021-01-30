import { Router } from 'express'
import destroy from './destroy'
import handled from './handled'
import heard from './heard'
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id/handled', handled)

router.patch('/:id/heard', heard)

router.delete('/:id', destroy)

export default router
