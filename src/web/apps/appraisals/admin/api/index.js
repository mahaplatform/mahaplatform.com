import responsibility_types from './responsibility_types'
import appraisals from './appraisals'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/appraisals', appraisals)

router.use('/responsibility_types', responsibility_types)

export default router
