import organizations from './organizations'
import recipients from './recipients'
import templates from './templates'
import workflows from './workflows'
import campaigns from './campaigns'
import programs from './programs'
import contacts from './contacts'
import { Router } from 'express'
import imports from './imports'
import emails from './emails'
import fields from './fields'
import topics from './topics'
import forms from './forms'
import lists from './lists'
import tags from './tags'

const router = new Router({ mergeParams: true })

router.use('/campaigns', campaigns)

router.use('/contacts', contacts)

router.use('/emails', emails)

router.use('/fields', fields)

router.use('/forms', forms)

router.use('/imports', imports)

router.use('/lists', lists)

router.use('/organizations', organizations)

router.use('/programs', programs)

router.use('/recipients', recipients)

router.use('/tags', tags)

router.use('/topics', topics)

router.use('/templates', templates)

router.use('/workflows', workflows)

export default router
