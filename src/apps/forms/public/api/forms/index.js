import { Router } from 'express'
import validate from './validate'
import uploads from './uploads'
import submit from './submit'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/:code', show)

router.post('/:code/validate', validate)

router.post('/:code', submit)

router.use('/:code/uploads', uploads)

export default router
