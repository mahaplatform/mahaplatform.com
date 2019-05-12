import { Router } from 'express'
import destroy from './destroy'

const router = new Router({ mergeParams: true })

router.delete('/', destroy)

export default router
