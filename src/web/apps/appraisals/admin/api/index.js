import appraisals from './appraisals'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/appraisals', appraisals)

export default router
