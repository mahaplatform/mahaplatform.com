import { Router } from 'express'
import create from './create'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', show)

router.post('/', create)

export default router
