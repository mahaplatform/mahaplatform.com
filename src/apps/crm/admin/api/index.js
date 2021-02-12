import templates from './templates'
import programs from './programs'
import contacts from './contacts'
import { Router } from 'express'
import imports from './imports'
import fields from './fields'
import topics from './topics'
import lists from './lists'
import calls from './calls'

const router = new Router({ mergeParams: true })

router.use('/calls', calls)

router.use('/contacts', contacts)

router.use('/fields', fields)

router.use('/imports', imports)

router.use('/lists', lists)

router.use('/programs', programs)

router.use('/topics', topics)

router.use('/templates', templates)

export default router
