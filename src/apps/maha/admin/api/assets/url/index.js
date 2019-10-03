import { Router } from 'express'
import preview from './preview'
import create from './create'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', show)

router.get('/preview', preview)

router.post('/', create)

export default router
