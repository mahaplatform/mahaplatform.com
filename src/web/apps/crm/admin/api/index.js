import organizations from './organizations'
import contacts from './contacts'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/contacts', contacts)

router.use('/organizations', organizations)

export default router
