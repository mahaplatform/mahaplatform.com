import numbers from './numbers'
import { Router } from 'express'
import faxes from './faxes'

const router = new Router({ mergeParams: true })

router.use('/faxes', faxes)

router.use('/numbers', numbers)

export default router
