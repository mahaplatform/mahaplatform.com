import preferences from './preferences'
import enrollments from './enrollments'
import { Router } from 'express'
import forms from './forms'

const router = new Router({ mergeParams: true })

router.use('/enrollments', enrollments)

router.use('/forms', forms)

router.use('/p:email_code([a-z0-9]{10}):channel_code([a-z0-9]{10})', preferences)

router.use('/p:type([a-z]{1}):program_code([a-z0-9]{10}):channel_code([a-z0-9]{10})', preferences)

export default router
