import preferences from './preferences'
import { Router } from 'express'
import forward from './forward'
import forms from './forms'

const router = new Router({ mergeParams: true })

router.use('/forms', forms)

router.use('/f:email_code([a-z0-9]{10})', forward)

router.use('/p:email_code([a-z0-9]{10}):channel_code([a-z0-9]{10})', preferences)

router.use('/p:type([a-z]{1}):program_code([a-z0-9]{10}):channel_code([a-z0-9]{10})', preferences)

export default router
