import { Router } from 'express'
import forms from './forms'

const router = new Router({ mergeParams: true })

router.use('/forms', forms)

export default router
