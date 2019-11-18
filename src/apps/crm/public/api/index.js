import { Router } from 'express'
import forms from './forms'
import payments from './payments'
import uploads from './uploads'

const router = new Router({ mergeParams: true })

router.use('/forms', forms)

router.use('/payments', payments)

router.use('/uploads', uploads)

export default router
