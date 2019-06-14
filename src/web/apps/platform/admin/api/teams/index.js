import { Router } from 'express'
import create from './create'
import update from './update'
import list from './list'
import show from './show'
import apps from './apps'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.patch('/:id', update)

router.get('/:id/apps', apps)

export default router
