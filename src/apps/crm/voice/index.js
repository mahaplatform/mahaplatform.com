import { Router } from 'express'
import recording from './recording'

const router = new Router({ mergeParams: true })

router.use('/recording', recording)

export default router
