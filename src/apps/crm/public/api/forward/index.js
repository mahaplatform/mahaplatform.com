import { Router } from 'express'
import submit from './submit'

const router = new Router({ mergeParams: true })

router.post('/:code', submit)

export default router
