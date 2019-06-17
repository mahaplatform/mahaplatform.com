import { Router } from 'express'
import update from './update'
import list from './list'
import show from './show'
import omit from './omit'
import fix from './fix'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.patch('/:id', update)

router.patch('/:id/omit', omit)

router.patch('/:id/fix', fix)

export default router
