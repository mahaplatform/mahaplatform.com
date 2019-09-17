import { Router } from 'express'
import update from './update'
import edit from './edit'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/edit', edit)

router.get('/', show)

router.patch('/', update)

export default router
