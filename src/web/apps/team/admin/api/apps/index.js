import { Router } from 'express'
import install from './install'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.get('/:id/install', install)

export default router
