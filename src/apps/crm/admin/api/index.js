import organizations from './organizations'
import programs from './programs'
import contacts from './contacts'
import { Router } from 'express'
import numbers from './numbers'
import tags from './tags'

const router = new Router({ mergeParams: true })

router.use('/contacts', contacts)

router.use('/numbers', numbers)

router.use('/organizations', organizations)

router.use('/tags', tags)

router.use('/programs', programs)

export default router
