import { Router } from 'express'
import submit from './submit'

const router = new Router({ mergeParams: true })

router.post('/', submit)

export default router
