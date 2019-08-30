import organizations from './organizations'
import programs from './programs'
import contacts from './contacts'
import { Router } from 'express'
import topics from './topics'
import lists from './lists'
import tags from './tags'

const router = new Router({ mergeParams: true })

router.use('/contacts', contacts)

router.use('/lists', lists)

router.use('/organizations', organizations)

router.use('/programs', programs)

router.use('/tags', tags)

router.use('/topics', topics)

export default router
