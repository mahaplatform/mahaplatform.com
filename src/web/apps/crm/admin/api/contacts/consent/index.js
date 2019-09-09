import { Router } from 'express'
import update from './update'
import list from './list'
import edit from './edit'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/edit', edit)

router.patch('/', update)

export default router
