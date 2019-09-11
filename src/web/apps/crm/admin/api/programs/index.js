import workflows from './workflows'
import templates from './templates'
import campaigns from './campaigns'
import { Router } from 'express'
import senders from './senders'
import topics from './topics'
import lists from './lists'
import forms from './forms'

const router = new Router({ mergeParams: true })

router.use('/campaigns', campaigns)

router.use('/forms', forms)

router.use('/lists', lists)

router.use('/senders', senders)

router.use('/templates', templates)

router.use('/topics', topics)

router.use('/workflows', workflows)

export default router
