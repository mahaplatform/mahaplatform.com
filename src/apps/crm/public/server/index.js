import preferences from './preferences'
import recordings from './recordings'
import { Router } from 'express'
import forms from './forms'

const router = new Router({ mergeParams: true })

router.use('/forms', forms)

router.use('/recordings', recordings)

router.use('/p:email_code([a-z0-9]{10}):channel_code([a-z0-9]{10})', preferences)

router.use('/p:type([a-z]{1}):program_code([a-z0-9]{10}):channel_code([a-z0-9]{10})', preferences)

export default router
