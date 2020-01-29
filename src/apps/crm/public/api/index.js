import { Router } from 'express'
import forms from './forms'
import payments from './payments'

const router = new Router({ mergeParams: true })

router.use('/forms', forms)

router.use('/payments', payments)

export default router
