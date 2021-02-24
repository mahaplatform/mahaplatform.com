import { Router } from 'express'
import datasets from './datasets'

const router = new Router({ mergeParams: true })

router.use('/datasets', datasets)

export default router
