import { Router } from 'express'
import panels from './panels'

const router = new Router({ mergeParams: true })

router.use('/panels', panels)

export default router
