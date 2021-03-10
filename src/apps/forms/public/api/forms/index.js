import { Router } from 'express'
import validate from './validate'
import submit from './submit'
import uploads from './uploads'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:code', show)

router.post('/:code/validate', validate)

router.post('/:code', submit)

router.use('/:code/uploads', uploads)

export default router
