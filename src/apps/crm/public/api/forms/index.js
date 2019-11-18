import { Router } from 'express'
import validate from './validate'
import submit from './submit'

const router = new Router({ mergeParams: true })

router.post('/:code/validate', validate)

router.post('/:code', submit)

export default router
