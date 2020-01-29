import { Router } from 'express'
import validate from './validate'
import submit from './submit'
import uploads from './uploads'

const router = new Router({ mergeParams: true })

router.post('/:code/validate', validate)

router.post('/:code', submit)

router.use('/:code/uploads', uploads)

export default router
