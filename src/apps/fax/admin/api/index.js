import { Router } from 'express'
import faxes from './faxes'

const router = new Router({ mergeParams: true })

router.use('/faxes', faxes)

export default router
